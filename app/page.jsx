import Link from 'next/link';
import { Card } from 'components/card';
import { RandomQuote } from 'components/random-quote';
import { Markdown } from 'components/markdown';
import { ContextAlert } from 'components/context-alert';
import { getNetlifyContext } from 'utils';

const cards = [
    //{ text: 'Hello', linkText: 'someLink', href: '/' }
];

const contextExplainer = `
The card below is rendered on the server based on the value of \`process.env.CONTEXT\` 
([docs](https://docs.netlify.com/configure-builds/environment-variables/#build-metadata)):
`;

const preDynamicContentExplainer = `
The card content below is fetched by the client-side from \`/quotes/random\` (see file \`app/quotes/random/route.js\`) with a different quote shown on each page load:
`;

const postDynamicContentExplainer = `
At HKCaseLaw, we're revolutionizing the way legal professionals access and analyze case law. 
Harnessing the power of artificial intelligence, natural language search, and cutting-edge RAG / GraphRAG technology, our app delivers precise and insightful legal analysis like never before. 
Our sophisticated reasoning LLM ensures that you receive comprehensive, contextually relevant case law searches and analyses, empowering you to make well-informed decisions quickly and efficiently. Join us in transforming legal research—experience the future today.
`;

const ctx = getNetlifyContext();

export default function Page() {
    return (
        <main className="flex flex-col gap-8 sm:gap-16">
            <section className="flex flex-col items-start gap-3 sm:gap-4">
                <ContextAlert />
                <h1 className="mb-0">Welcome to Caselaw HK</h1>
                <p className="text-lg">The future of legal research with advance RAG.</p>
                <Link
                    href="https://instagram.com/haig.ay"
                    className="btn btn-lg btn-primary sm:btn-wide"
                >
                    Learn More
                </Link>
            
            <section className="flex flex-col gap-4">
                <Markdown content={postDynamicContentExplainer} />
            </section>
            {/* !!cards?.length && <CardsGrid cards={cards} /> */}
        </main>
    );
}

function RuntimeContextCard() {
    const title = `Netlify Context: running in ${ctx} mode.`;
    if (ctx === 'dev') {
        return <Card title={title} text="Next.js will rebuild any page you navigate to, including static pages." />;
    } else {
        return <Card title={title} text="This page was statically-generated at build time." />;
    }
}
