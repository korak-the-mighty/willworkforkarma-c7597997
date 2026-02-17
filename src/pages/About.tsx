import Layout from "@/components/Layout";

const About = () => (
  <Layout>
    <article className="space-y-8 max-w-2xl">
      <h1 className="font-serif text-4xl tracking-tight">About</h1>
      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <p>
          I've spent the better part of two decades helping teams figure out what they're actually trying to say — and then helping them say it clearly, simply, and in a way that holds up over time.
        </p>
        <p>
          My work sits at the intersection of strategy and craft. I don't separate thinking from making. The best ideas emerge when you're willing to write the rough draft, question the brief, and stay close to the material. I believe in small teams, honest conversations, and doing fewer things well.
        </p>
        <p>
          I've led creative work for organizations ranging from early-stage startups to global enterprises. The common thread isn't industry — it's complexity. I'm most useful when the problem is tangled, the stakes are real, and the obvious answer isn't working.
        </p>
        <p>
          I value clarity over cleverness, substance over style, and work that respects the audience's intelligence. If that sounds like the kind of thinking you need, I'd enjoy the conversation.
        </p>
      </div>
    </article>
  </Layout>
);

export default About;
