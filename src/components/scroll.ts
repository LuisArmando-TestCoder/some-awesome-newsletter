export default function scroll(id: string) {
    const element = document.getElementById(id);

    if (!element) {
        throw Error(`id ${id} doesn't exists`)
    }

    window.scrollTo(window.scrollX + element.getBoundingClientRect().left, window.scrollY + element.getBoundingClientRect().top)
}