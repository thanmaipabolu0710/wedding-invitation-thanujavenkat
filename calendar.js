/**
 * CALENDAR INTEGRATION HELPERS
 * Supports Google Calendar web events and universal .ics calendar file downloads.
 */

const CalendarHelper = {
  /**
   * Formats ISO string (YYYY-MM-DDTHH:mm:ss+ZZ:ZZ) to UTC format YYYYMMDDTHHMMSSZ for ICS & Google Calendar
   */
  formatToUtcString(isoString) {
    const date = new Date(isoString);
    const pad = (n) => (n < 10 ? '0' + n : n);
    return (
      date.getUTCFullYear().toString() +
      pad(date.getUTCMonth() + 1) +
      pad(date.getUTCDate()) +
      'T' +
      pad(date.getUTCHours()) +
      pad(date.getUTCMinutes()) +
      pad(date.getUTCSeconds()) +
      'Z'
    );
  },

  /**
   * Generates a direct Google Calendar add event URL
   */
  getGoogleCalendarUrl(event) {
    const startUtc = this.formatToUtcString(event.startISO);
    const endUtc = this.formatToUtcString(event.endISO);
    const title = encodeURIComponent(`${event.title} — ${WEDDING_CONFIG.couple.monogram} Wedding`);
    const details = encodeURIComponent(
      `${event.subtitle}\n\nDress Code: ${event.dressCode}\n\n${event.description}\n\nVenue: ${event.venueName}, ${WEDDING_CONFIG.venue.address}`
    );
    const location = encodeURIComponent(`${event.venueName}, ${WEDDING_CONFIG.venue.address}`);

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startUtc}/${endUtc}&details=${details}&location=${location}&sf=true&output=xml`;
  },

  /**
   * Generates and triggers download of an .ics calendar file for Apple Calendar / Outlook / Mobile devices
   */
  downloadIcs(event) {
    const startUtc = this.formatToUtcString(event.startISO);
    const endUtc = this.formatToUtcString(event.endISO);
    const nowUtc = this.formatToUtcString(new Date().toISOString());
    const uid = `wedding-${event.id}-${Date.now()}@royalwedding.com`;
    const summary = `${event.title} — ${WEDDING_CONFIG.couple.monogram} Wedding`;
    const description = `${event.subtitle}\\nDress Code: ${event.dressCode}\\n${event.description}`;
    const location = `${event.venueName}, ${WEDDING_CONFIG.venue.address}`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Royal Indian Wedding//Invitation//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${nowUtc}`,
      `DTSTART:${startUtc}`,
      `DTEND:${endUtc}`,
      `SUMMARY:${summary}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      'STATUS:CONFIRMED',
      'SEQUENCE:0',
      'BEGIN:VALARM',
      'TRIGGER:-PT24H',
      'ACTION:DISPLAY',
      `DESCRIPTION:Reminder: ${summary} is tomorrow!`,
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${event.id}-invitation.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};
