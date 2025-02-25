import React from 'react';
import Markdown from 'your-markdown-component'; // Replace with your actual Markdown component
import CardsGrid from 'your-cards-grid-component'; // Replace with your actual CardsGrid component

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
