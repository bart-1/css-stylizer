# CSS Stylizer

![image](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E) ![image](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![image](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)![image](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white)

## About

Is for checking colour of text and background with functional notations like RGBA and HSLA and hexadecimal notation.
You can compare and switch notations for choosed color.
You can check 3 samples separatly.

## Demo

[link](https://dziwnykot.pl/css-stylizer)

## Usage

You can easly increase number of samples in code by adding element to object array named samplesSetup in appLibrary.ts

```javascript
const samplesSetup: SamplesSetup[] = [
  {
    id: 1,
    CSSTargets: ["color", "background-color"],
    colorModel: "rgba",
    initialColorValues: {
      color: { r: 0, g: 0, b: 0, a: 100 },
      background: { r: 255, g: 255, b: 255, a: 100 },
    },
  },
  {
    id: 2,
    CSSTargets: ["color", "background-color"],
    colorModel: "hsla",
    initialColorValues: {
      color: { h: 0, s: 0, l: 0, a: 100 },
      background: { h: 0, s: 0, l: 100, a: 100 },
    },
  },
  {
    id: 3,
    CSSTargets: ["color", "background-color"],
    colorModel: "hexa",
    initialColorValues: {
      color: { hex: "#000000", a: 100 },
      background: { hex: "#FFFFFF", a: 100 },
    },
  },
];
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
