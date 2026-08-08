import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useForm } from '@formspree/react'
import { track } from '@vercel/analytics'
import { Reveal } from './motion.jsx'
import {
  SEGMENTS,
  SEGMENT_SELF_HOSTED,
  SEGMENT_MANAGED_CLOUD,
} from '../lib/waitlist.js'
import { captureUtm, getUtm, isPhReferral } from '../lib/utm.js'

// Formspree form id. Override without editing code via VITE_WAITLIST_FORM
// (e.g. in .env.local). The id is client-side by design — the browser
// POSTs to https://formspree.io/f/<id>, so it is not a secret.
const FORM_ID =
  (import.meta && import.meta.env && import.meta.env.VITE_WAITLIST_FORM) ||
  '3049879369762733580'

const TEAM_SIZES = ['solo', '2–5', '6+', 'enterprise']

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Waitlist() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [formState, submit] = useForm(FORM_ID)
  const { submitting, succeeded, errors: serverErrors } = formState

  const [email, setEmail] = useState('')
  const [segment, setSegment] = useState(
    () => (SEGMENTS.includes(searchParams.get('segment')) ? searchParams.get('segment') : '')
  )
  const [teamSize, setTeamSize] = useState('')
  const [stack, setStack] = useState('')
  const [gotcha, setGotcha] = useState('')
  const [consent, setConsent] = useState(false)
  const [errors, setErrors] = useState({})
  const emailRef = useRef(null)

  // Keep the URL in sync if the visitor changes the pre-selected segment.
  useEffect(() => {
    const current = searchParams.get('segment') || ''
    if (current !== segment) {
      if (segment && SEGMENTS.includes(segment)) {
        setSearchParams((p) => {
          p.set('segment', segment)
          return p
        }, { replace: true })
      } else if (current) {
        setSearchParams((p) => {
          p.delete('segment')
          return p
        }, { replace: true })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [segment])

  const validate = () => {
    const next = {}
    if (!EMAIL_RE.test(email.trim())) next.email = 'Enter a valid email address.'
    if (!segment) next.segment = 'Pick how you expect to run NIKI.'
    if (!consent) next.consent = 'Please consent to being contacted.'
    setErrors(next)
    if (next.email && emailRef.current) emailRef.current.focus()
    else if (next.segment) {
      const radio = document.getElementById('seg-' + SEGMENTS[0])
      const card = radio && radio.closest('.wl-seg-card')
      if (card) card.focus()
    }
    return Object.keys(next).length === 0
  }

  const onSubmit = (e) => {
    // Run our own validation first; if it fails, stop before Formspree sees it.
    const isValid = validate()
    if (!isValid) {
      track('waitlist_validation_failed', {
        email: EMAIL_RE.test(email.trim()) ? 'ok' : 'invalid',
        segment: segment ? 'selected' : 'missing',
      })
      e.preventDefault()
      return
    }
    track('waitlist_submitted', {
      segment,
      teamSize: teamSize || 'unknown',
      hasStack: stack.trim() ? 'yes' : 'no',
    })
    submit(e)
  }

  useEffect(() => {
    captureUtm()
    if (isPhReferral()) {
      track('ph_referral')
    }
    track('waitlist_viewed')
  }, [])

  useEffect(() => {
    if (succeeded) {
      track('waitlist_submission_success', {
        segment: segment || 'unknown',
        teamSize: teamSize || 'unknown',
      })
    }
  }, [segment, succeeded, teamSize])

  useEffect(() => {
    if (serverErrors) track('waitlist_submission_error')
  }, [serverErrors])

  const serverMessage = serverErrors?.formErrors?.length
    ? serverErrors.formErrors.map((f) => f.message).join(', ')
    : "Something went wrong sending your request. Please try again in a moment."

  return (
    <section className="section" data-od-id="waitlist" id="waitlist">
      <Reveal className="container">
        <h2 className="heading mb-lg">Self-hosted is ready. The waitlist is for the cloud beta.</h2>
        <p className="body mb-xl" style={{ maxWidth: '56ch' }}>
          Self-hosted Niki is available now — clone, build, and run. The waitlist opens access
          to the managed cloud beta and launch-day updates; no spam.
        </p>

        {succeeded ? (
          <div className="wl-success" data-od-id="wl-success" role="status">
            <h3 className="body-strong mb-lg">You&apos;re on the list.</h3>
            <p className="body" style={{ maxWidth: '52ch' }}>
              Thanks — you&apos;re on the list for the cloud beta and launch-day updates.
              Self-hosted Niki is available now if you want to try it today.
            </p>
          </div>
        ) : (
          <form className="wl-form" data-od-id="wl-form" onSubmit={onSubmit} noValidate>
            {/* UTM hidden fields for attribution */}
            <input type="hidden" name="utm_source" value={getUtm().utm_source || ''} />
            <input type="hidden" name="utm_medium" value={getUtm().utm_medium || ''} />
            <input type="hidden" name="utm_campaign" value={getUtm().utm_campaign || ''} />

            {/* honeypot — hidden from humans, bots fill it */}
            <div className="wl-gotcha" aria-hidden="true">
              <label>
                Leave this empty
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  value={gotcha}
                  onChange={(e) => setGotcha(e.target.value)}
                />
              </label>
            </div>

            <div className="wl-field">
              <label className="wl-label" htmlFor="wl-email">
                Email <span className="wl-req" aria-hidden="true">*</span>
              </label>
              <input
                id="wl-email"
                name="email"
                ref={emailRef}
                className="wl-input"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={email}
                aria-required="true"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'wl-email-err' : undefined}
                onChange={(e) => setEmail(e.target.value)}
                data-od-id="wl-email"
              />
              {errors.email && (
                <p className="wl-error" id="wl-email-err" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <fieldset className="wl-field wl-seg-field" data-od-id="wl-segment">
              <legend className="wl-label">
                How will you run NIKI? <span className="wl-req" aria-hidden="true">*</span>
              </legend>
              <div className="wl-seg" role="radiogroup" aria-label="How will you run NIKI?">
                {SEGMENTS.map((value) => {
                  const id = 'seg-' + value
                  const hint =
                    value === SEGMENT_SELF_HOSTED
                      ? 'Run it on your own infra with your keys.'
                      : value === SEGMENT_MANAGED_CLOUD
                        ? 'Let NIKI host the agents for you.'
                        : "Not decided yet — that's fine."
                  const checked = segment === value
                  return (
                    <label
                      key={value}
                      htmlFor={id}
                      className={`wl-seg-card${checked ? ' is-checked' : ''}`}
                      tabIndex={-1}
                    >
                      <input
                        id={id}
                        type="radio"
                        name="segment"
                        value={value}
                        checked={checked}
                        aria-required="true"
                        aria-invalid={errors.segment ? 'true' : 'false'}
                        onChange={() => {
                          setSegment(value)
                          if (errors.segment)
                            setErrors((p) => ({ ...p, segment: undefined }))
                        }}
                        data-od-id="wl-seg"
                      />
                      <span className="wl-seg-title">{value}</span>
                      <span className="wl-seg-hint">{hint}</span>
                    </label>
                  )
                })}
              </div>
              {errors.segment && (
                <p className="wl-error" id="wl-seg-err" role="alert">
                  {errors.segment}
                </p>
              )}
            </fieldset>

            <div className="wl-row">
              <div className="wl-field">
                <label className="wl-label" htmlFor="wl-team">
                  Team size <span className="wl-opt">(optional)</span>
                </label>
                <select
                  id="wl-team"
                  name="teamSize"
                  className="wl-select"
                  value={teamSize}
                  onChange={(e) => setTeamSize(e.target.value)}
                  data-od-id="wl-team"
                >
                  <option value="">—</option>
                  {TEAM_SIZES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="wl-field wl-field-grow">
                <label className="wl-label" htmlFor="wl-stack">
                  Primary language / stack <span className="wl-opt">(optional)</span>
                </label>
                <input
                  id="wl-stack"
                  name="stack"
                  className="wl-input"
                  type="text"
                  placeholder="e.g. TypeScript + React, Python, Rust"
                  value={stack}
                  onChange={(e) => setStack(e.target.value)}
                  data-od-id="wl-stack"
                />
              </div>
            </div>

            <div className="wl-field">
              <label className="wl-consent" htmlFor="wl-consent">
                <input
                  id="wl-consent"
                  name="consent"
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => {
                    setConsent(e.target.checked)
                    if (errors.consent) setErrors((p) => ({ ...p, consent: undefined }))
                  }}
                  aria-required="true"
                  aria-invalid={errors.consent ? 'true' : 'false'}
                  aria-describedby={errors.consent ? 'wl-consent-err' : undefined}
                  data-od-id="wl-consent"
                />
                <span>
                  I agree to be contacted about Niki updates. See the{' '}
                  <Link className="ink" to="/privacy" data-od-id="wl-privacy-link">
                    privacy policy
                  </Link>
                  .
                </span>
              </label>
              {errors.consent && (
                <p className="wl-error" id="wl-consent-err" role="alert">
                  {errors.consent}
                </p>
              )}
            </div>

            {serverErrors && (
              <p className="wl-error wl-form-error" role="alert">
                {serverMessage}
              </p>
            )}

            <div className="wl-actions">
              <button
                type="submit"
                className="btn btn-primary"
                data-od-id="wl-submit"
                disabled={submitting}
              >
                {submitting ? 'Joining…' : 'Join waitlist'}
              </button>
              <p className="caption wl-fineprint">
                We&apos;ll only email you about Niki. See our{' '}
                <Link className="ink" to="/privacy" data-od-id="wl-fineprint-privacy">
                  privacy policy
                </Link>
                .
              </p>
            </div>
          </form>
        )}
      </Reveal>
    </section>
  )
}
