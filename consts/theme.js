
export let theme = "dark";

const colors = {
  light: {
    bg: "#fff",
    text: "#2f0f0f",
    title: "#2f0f0f",
    fg: "#efdfdf",
    accent: "#ddd0d0",
    secondary: "#e0bfbf"
  },
  brown: {
    bg: "#EAF9D9",
    text: "#653239",
    title: "#653239",
    fg: "#E2D4BA",
    accent: "#CCC7B9",
    secondary: "#AF7A6D"
  },
  dark: {
    bg: "#efefef",
    // text: "#3B0D11",
    text: "#493657",
    title: "#493657",
    fg: "#BEE5BF",
    accent: "#9DC7C8",
    secondary: "#DFF3E3"
  }

}


export const getColor = (name) => colors[theme][name];