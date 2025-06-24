import React from 'react';

const eventsData = [
    {
        id: 1,
        title: 'Rust Tournament 2023',
        date: '2023-11-15',
        description: 'Join us for the annual Rust Tournament where players compete for glory and prizes!'
    },
    {
        id: 2,
        title: 'Rust Community Meetup',
        date: '2023-12-01',
        description: 'A gathering for Rust enthusiasts to share strategies, tips, and experiences.'
    },
    {
        id: 3,
        title: 'Rust Game Development Workshop',
        date: '2024-01-10',
        description: 'Learn how to create your own Rust mods and games in this hands-on workshop.'
    }
];

const Events = () => {
    return (
        <div>
            <h1>Upcoming Events</h1>
            <div className="events-list">
                {eventsData.map(event => (
                    <EventCard key={event.id} title={event.title} date={event.date} description={event.description} />
                ))}
            </div>
        </div>
    );
};

export default Events;