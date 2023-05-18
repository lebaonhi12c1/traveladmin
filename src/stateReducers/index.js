const destinationReducer = {
  initSate: {
    name: "",
    description: "",
    openingDate: "",
  },
  reducer: (state, action) => {
    switch (action.type) {
      case "setName":
        return {
          ...state,
          name: action.payload,
        };
      case "setDesc":
        return {
          ...state,
          description: action.payload,
        };
      case "setDate":
        return {
          ...state,
          openingDate: action.payload,
        };
      default:
        break;
    }
  },
};
const tourReducer = {
  initSate: {
    title: "",
    price: 0,
    level: "",
    availableSlots: 0,
    age: 0,
    numberOfDay: 0,
    rating: 5,
    description: "",
  },
  reducer: (state, action) => {
    switch (action.type) {
      case "setTitle":
        return {
          ...state,
          title: action.payload,
        };
      case "setPrice":
        return {
          ...state,
          price: action.payload,
        };
      case "setLevel":
        return {
          ...state,
          level: action.payload,
        };
      case "setAvailableSlots":
        return {
          ...state,
          availableSlots: action.payload,
        };
      case "setAge":
        return {
          ...state,
          age: action.payload,
        };
      case "setNumberOfDay":
        return {
          ...state,
          numberOfDay: action.payload,
        };
      case "setRating":
        return {
          ...state,
          rating: action.payload,
        };
      case "setDesc":
        return {
          ...state,
          description: action.payload,
        };
      default:
        break;
    }
  },
};
const blogReducer = {
  initSate: {
    title: "",
    description: "",
    tags: "",
  },
  reducer: (state, action) => {
    switch (action.type) {
      case "setTitle":
        return {
          ...state,
          title: action.payload,
        };
      case "setDesc":
        return {
          ...state,
          description: action.payload,
        };
      case "setTags":
        return {
          ...state,
          tags: action.payload,
        };
      default:
        break;
    }
  },
};

const destinationUpdateReducer = {
  initSate: {
    name: "",
    description: "",
    image: "",
    status: "",
  },
  reducer: (state, action) => {
    switch (action.type) {
      case "setName":
        return {
          ...state,
          name: action.payload,
        };
      case "setDesc":
        return {
          ...state,
          description: action.payload,
        };
      case "setImage":
        return {
          ...state,
          image: action.payload,
        };
      case "setStatus":
        return {
          ...state,
          status: action.payload,
        };
      default:
        break;
    }
  },
};
const tourUpdateReducer = {
  init: {
    _id: "",
    title: "",
    description: "",
    price: 0,
    destination: "",
    image: "",
    image_public_id: "",
    images: [],
    level: "",
    availableSlots: 0,
    age: 0,
    numberOfDay: "",
    rating: 0,
    status: "draft",
    content: "",
    public_id: "",
  },
  reducer: (state, action) => {
    switch (action.payload) {
      case "setTitle":
        return {
          ...state,
          title: action.payload,
        };
      case "setDescription":
        return {
          ...state,
          description: action.payload,
        };
      case "setPrice":
        return {
          ...state,
          price: action.payload,
        };
      case "setDestination":
        return {
          ...state,
          destination: action.payload,
        };
      case "setImage":
        return {
          ...state,
          image: action.payload,
        };
      case "setImage_public_id":
        return {
          ...state,
          image_public_id: action.payload,
        };
      case "setImages":
        return {
          ...state,
          images: action.payload,
        };
      case "setLevel":
        return {
          ...state,
          level: action.payload,
        };
      case "setAvailableSlots":
        return {
          ...state,
          availableSlots: action.payload,
        };
      case "setAvailableSlots":
        return {
          ...state,
          availableSlots: action.payload,
        };
      case "setAvailableSlots":
        return {
          ...state,
          availableSlots: action.payload,
        };
      case "setAvailableSlots":
        return {
          ...state,
          availableSlots: action.payload,
        };
      default:
        break;
    }
  },
};
export {
  destinationReducer,
  tourReducer,
  blogReducer,
  destinationUpdateReducer,
};
