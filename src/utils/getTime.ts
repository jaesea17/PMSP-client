export function getTime(data: number | Date) {
    return new Intl.DateTimeFormat("en-us", {
        dateStyle: "short",
        timeStyle: "short"
    }).format(new Date(data))
}