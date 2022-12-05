const dateFormat = (t: Date): string => {
    const date = ('0' + t.getDate()).slice(-2);
    const month = ('0' + (t.getMonth() + 1)).slice(-2);
    const year = t.getFullYear();
    const hours = ('0' + t.getHours()).slice(-2);
    const minutes = ('0' + t.getMinutes()).slice(-2);
    const seconds = ('0' + t.getSeconds()).slice(-2);
    const time = `${date}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    console.log(time)
    return time
}
export { dateFormat };