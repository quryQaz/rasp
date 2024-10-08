const GetColorCode = (color) => {
  switch (color) {
    case 'orange':
      return '#ef4824'
    case 'white':
      return '#e1e1e1'
    case 'full-white':
      return '#ffffff'
    case 'black':
      return '#151515'
    case 'full-black':
      return '#000000'
    case 'blue':
      return '#2b3674'
    case 'green':
      return '#35ce43'
    case 'red':
      return '#e71e1e'
    case 'pink':
      return '#792950'
    default:
      return '#f4f7fe'

  }
}

export default GetColorCode;
