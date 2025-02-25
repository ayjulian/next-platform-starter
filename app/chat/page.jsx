import React from 'react';
import Markdown from '@/components/Markdown'; // Replace with the correct path
import CardsGrid from '@/components/CardsGrid'; // Replace with the correct path

export default function Page() {
    const postDynamicContentExplainer = "Your dynamic content here...";
    const cards = []; // Replace with your actual cards data

    return (
        <main>
            <section>
                <Markdown content={postDynamicContentExplainer} />
            </section>
            {cards?.length > 0 && <CardsGrid cards={cards} />}
        </main>
    );
}

function RuntimeContextCard() {
    const ctx = "your-context"; // Replace with your actual context
    const title = `Netlify Context: running in ${ctx} mode.`;
    return (
        <div>
            <h2>{title}</h2>
        </div>
    );
}
