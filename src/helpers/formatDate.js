export function formatDate(dateString) {
    // Create a Date object from the provided string
    const date = new Date(dateString);

    // Extract day, month, and year components
    const day = date.getDate();
    const month = date.toLocaleDateString('en-GB', { month: 'short' }); // Local UK english, get abbreviated month name
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
}