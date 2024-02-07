
export let theme = "light";

const colors = {
  [theme]: {
    bg: "#fff",
    text: "#2f0f0f",
    fg: "#efdfdf",
    accent: "#ddd0d0",
    secondary: "#e0bfbf"
  }

}


export const getColor = (name) => colors[theme][name];