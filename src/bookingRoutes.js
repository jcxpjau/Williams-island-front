import BookingClient from "views/bookings/BookingClient";


const bookingRoutes = [
  {
    path: "/",
    component: <BookingClient />,
    layout: "/booking",
  }
];

export default bookingRoutes;