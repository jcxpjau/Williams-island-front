import BookingClient from "views/bookings/BookingClient";
import BookingConfirm from "views/bookings/BookingConfirm";
import BookingResume from "views/bookings/BookingResume";


const bookingRoutes = [
  {
    path: "/",
    name: "booking", 
    component: BookingClient,
    layout: "/booking",
  },
  {
    path: "/resume",
    name: "My Bookings", 
    component: BookingResume ,
    layout: "/booking",
  },
  {
    path: "/resume/:id",
    name: "My Bookings", 
    component: BookingResume,
    layout: "/booking",
  },
  {
    path: "/:id/confirm",
    name: "Confirm Bookings", 
    component: BookingConfirm,
    layout: "/booking",
  }
];

export default bookingRoutes;