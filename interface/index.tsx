export interface Hotels {
    id: number,
    title: string,
    image: string,
    location: string,
    gallery: string[],
    description: string,
    rating: number,
    pricePeerDay: string,
    type: string
}
export interface Reviews {
    id: number,
    author: string,
    text: string,
    date: string,
    imageReview: string[],
    rating: string,
    tripsId: string
}

export interface TripsProps {
    id: number,
    title: string,
    image: string,
    location: string,
    category: string,
    description: string[],
    gallery: string,
    tripsDay: string,
    rating: number,
    hotels: Hotels[],
    reviews: Reviews[],
    detailsTripsDay: string[],
    price: string,
    type: string
}
