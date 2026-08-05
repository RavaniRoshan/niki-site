import { Reveal } from './motion.jsx'

export default function Demo() {
  return (
    <section className="section" data-od-id="demo" id="demo">
      <div className="container">
        <Reveal>
          <h2 className="heading mb-lg">See it run</h2>
          <p className="body mb-xl" style={{ maxWidth: '58ch' }}>
            Niki runs the full Planner → Coder → Tester → Red → Reviewer loop inside a sandbox and hands
            you back a branch. Here's a real session, end to end.
          </p>
          <figure className="demo-frame">
            <div className="demo-bar" aria-hidden="true">
              <span className="demo-dots">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
              </span>
              <span className="demo-title">niki · session</span>
            </div>
            <img
              className="demo-gif"
              src="/demo.gif"
              alt="Niki running a multi-agent coding session in the terminal"
              loading="lazy"
            />
          </figure>
        </Reveal>
      </div>
    </section>
  )
}
