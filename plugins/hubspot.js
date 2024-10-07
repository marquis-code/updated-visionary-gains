// plugins/hubspot.js
import Vue from 'vue';
import Hubspot from '@hubspot/analytics';

export default ({ app }, inject) => {
  const hubspot = new Hubspot({
    portalId: '145161941',  // Replace with your actual HubSpot portal ID
  });

  // Inject Hubspot into Vue instance
  inject('hubspot', hubspot);

  hubspot.load();

  // Optional: Configure the chatbot once it's loaded
  hubspot.on('loaded', () => {
    console.log('HubSpot chat loaded');
    // Additional customization or event handling can be done here
  });
};
