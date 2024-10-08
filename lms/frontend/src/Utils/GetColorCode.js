const GetColorCode = (color) => {
  switch (color) {
    case 'orange':
      return '#ef4824'
    case 'white':
      return '#f9f9f9'
    case 'full-white':
      return '#ffffff'
    case 'black':
      return '#545454'
    case 'full-black':
      return '#000000'
    case 'blue':
      return '#2b3674'
    default:
      return '#f4f7fe'

  }
}

export default GetColorCode;
