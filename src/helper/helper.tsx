const changeCategory = (value: string) => {
  let cate = ''
  switch (value) {
    case 'lap-trinh': 
    return cate = 'Lập Trình'
    break
    case 'van-hoc': 
    return cate = 'Văn Học'
    break
    case 'khoa-hoc': 
    return cate = 'Khoa Học'
    break
    case 'kinh-te': 
    return cate = 'Kinh Tế'
    break
    case 'tam-ly': 
    return cate = 'Tâm Lý'
    break
    case 'giao-khoa': 
    return cate = 'Giáo Khoa'
    break
    case 'thieu-nhi': 
    return cate = 'Thiếu Nhi'
    break
  }
}

export const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

export default changeCategory