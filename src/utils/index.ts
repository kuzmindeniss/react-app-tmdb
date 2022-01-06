export const formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split('-');
    const date = new Date(+year, +month, +day);
    return date.toLocaleString("ru", {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).replace(/\s*г\.$/, "");
}