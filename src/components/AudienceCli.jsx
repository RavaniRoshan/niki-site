const CLI = [
  ['niki status', '— current task · branch · verdict'],
  ['niki report', '— full audit by id or short prefix'],
  ['niki dashboard', '— static HTML diff + annotations'],
  ['niki recommend', '— per-agent model cost/quality'],
  ['niki run --tui', '— agentic terminal transcript'],
]

import { Reveal } from './motion.jsx'

export default function AudienceCli() {
  return (
    <section className="section" data-od-id="cli-audience">
      <Reveal className="container split">
        <div>
          <h2 className="heading mb-lg">Who it’s for</h2>
          <p className="body">
            Solo developers, indie hackers, and small teams (2–5) who already use AI coding tools but
            are tired of the prompt-response loop — and want to delegate multi-file tasks and review a
            polished result instead.
          </p>
        </div>
        <div>
          <h2 className="heading mb-lg">CLI surface</h2>
          {CLI.map(([cmd, desc]) => (
            <div className="list-row" key={cmd}>
              <span className="mark">[-]</span>
              <div>
                <span className="label">{cmd}</span> {desc}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
