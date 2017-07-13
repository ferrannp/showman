/**
 * Transform a TV Show trakt status to more user friendly string
 * @param status from {@link http://docs.trakt.apiary.io/reference/shows/summary}
 * @returns {String}
 */
export function toStatusString(status) {
  if (!status) {
    return 'Unknown';
  }
  switch (status) {
    case 'returning series':
    case 'in production':
    case 'planned':
      return 'Continuing';
    case 'canceled':
      return 'Canceled';
    case 'ended':
      return 'Ended';
    default:
      throw Error('Invalid status!');
  }
}