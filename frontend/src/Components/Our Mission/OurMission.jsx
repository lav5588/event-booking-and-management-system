import React from 'react';

function OurMission() {
  return (
    <div className="bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-6">Our Mission at EventCrafter</h2>

        {/* Mission Introduction */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Introduction</h3>
          <p className="text-lg text-gray-800 leading-relaxed">
            At EventCrafter, our mission is to provide a seamless and unforgettable experience for event organizers and attendees alike.
          </p>
        </section>

        {/* Empowering Event Organizers */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Empowering Event Organizers</h3>
          <p className="text-lg text-gray-800 leading-relaxed">
            We strive to empower event planners with the tools and resources they need to create successful and memorable events.
          </p>
          <p className="text-lg text-gray-800 leading-relaxed">
            Whether you're organizing a small gathering, a corporate conference, or a large-scale festival, EventCrafter is here to support you every step of the way.
          </p>
        </section>

        {/* Supporting Event Attendees */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Supporting Event Attendees</h3>
          <p className="text-lg text-gray-800 leading-relaxed">
            We are dedicated to ensuring that attendees can easily discover, register for, and enjoy a wide range of exciting events.
          </p>
        </section>

        {/* Call to Action */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Join Us</h3>
          <p className="text-lg text-gray-800 leading-relaxed">
            Join us in our mission to revolutionize event booking and management, and let's create unforgettable experiences together!
          </p>
        </section>

        {/* Conclusion */}
        <section>
          <p className="text-lg text-gray-800 leading-relaxed">
            Thank you for being a part of the EventCrafter community.
          </p>
        </section>

      </div>
    </div>
  );
}

export default OurMission;
