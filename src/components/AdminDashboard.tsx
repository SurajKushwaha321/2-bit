import React, { useState } from 'react';
import { Calendar, Users, Clock, Activity } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  registrations: number;
}

export default function AdminDashboard() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Welcome to Fusion Club!',
      date: '2023-11-15',
      category: 'Tech',
      description: 'Join us for our inaugural event and learn what Fusion Club is all about! Meet fellow members, learn about upcoming activities, and enjoy some refreshments.',
      registrations: 0
    },
    {
      id: '2',
      title: 'AI Workshop',
      date: '2023-11-22',
      category: 'Tech',
      description: 'Learn the basics of artificial intelligence and machine learning in this hands-on workshop. No prior experience required!',
      registrations: 0
    },
    {
      id: '3',
      title: 'Game Design Challenge',
      date: '2023-11-29',
      category: 'Gaming',
      description: 'Design and prototype a game in just 48 hours! Work in teams or solo to create something amazing.',
      registrations: 0
    },
    {
      id: '4',
      title: 'Cgc',
      date: '2025-04-05',
      category: 'Tech',
      description: 'We are doing nothing in this, we will pass just time pass',
      registrations: 0
    }
  ]);

  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    category: 'Tech',
    description: ''
  });

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const event: Event = {
      id: (events.length + 1).toString(),
      title: newEvent.title,
      date: newEvent.date,
      category: newEvent.category,
      description: newEvent.description,
      registrations: 0
    };
    setEvents([...events, event]);
    setNewEvent({ title: '', date: '', category: 'Tech', description: '' });
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const upcomingEvents = events.filter(event => new Date(event.date) > new Date()).length;
  const totalRegistrations = events.reduce((acc, event) => acc + event.registrations, 0);

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Events"
          value={events.length}
          icon={<Calendar className="w-6 h-6 text-orange-500" />}
        />
        <StatCard
          title="Upcoming Events"
          value={upcomingEvents}
          icon={<Clock className="w-6 h-6 text-orange-500" />}
        />
        <StatCard
          title="Total Registrations"
          value={totalRegistrations}
          icon={<Users className="w-6 h-6 text-orange-500" />}
        />
        <StatCard
          title="Active Users"
          value={0}
          icon={<Activity className="w-6 h-6 text-orange-500" />}
        />
      </div>

      {/* Add New Event Form */}
      <div className="bg-[#2a1212] rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-orange-500 mb-6">Add New Event</h2>
        <form onSubmit={handleAddEvent} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Event Name</label>
            <input
              type="text"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              placeholder="Enter event name"
              className="w-full px-4 py-2 rounded bg-[#1a0808] border border-gray-600 focus:border-orange-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Event Date</label>
            <input
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              className="w-full px-4 py-2 rounded bg-[#1a0808] border border-gray-600 focus:border-orange-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={newEvent.category}
              onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
              className="w-full px-4 py-2 rounded bg-[#1a0808] border border-gray-600 focus:border-orange-500 focus:outline-none"
            >
              <option value="Tech">Tech</option>
              <option value="Gaming">Gaming</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              placeholder="Enter event description"
              rows={4}
              className="w-full px-4 py-2 rounded bg-[#1a0808] border border-gray-600 focus:border-orange-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 font-medium"
          >
            Add Event
          </button>
        </form>
      </div>

      {/* Manage Events */}
      <div>
        <h2 className="text-xl font-bold text-white mb-6">Manage Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-[#2a1212] rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block px-3 py-1 bg-orange-500/20 text-orange-500 rounded-full text-sm">
                    {event.category}
                  </span>
                  <span className="text-gray-400 text-sm">{event.date}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-gray-400 mb-4 line-clamp-2">{event.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">
                    Registrations: {event.registrations}
                  </span>
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="px-4 py-2 text-red-500 hover:text-red-400"
                  >
                    Delete Event
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="bg-[#2a1212] rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        {icon}
        <span className="text-3xl font-bold">{value}</span>
      </div>
      <h3 className="text-gray-400">{title}</h3>
    </div>
  );
}