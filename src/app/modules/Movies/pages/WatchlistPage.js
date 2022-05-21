import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../_redux/watchlist/watchlistActions";
import { notification } from "antd";
import "../../../../_theme/layout/styles/layout.css";
import { useNavigate } from "react-router";

const movies = [
  {
    id: 1,
    src: "images/demo/img/7.jpg",
    title: "movie: 1917",
    description: "917 is a 2019 British war film directed and produced by Sam Mendes ",
    time: "Apr,02",
  },
  {
    id: 2,
    src: "images/demo/img/2.jpeg",
    title: "movie: War",
    description: "Isaac Florentine is an Israeli film director. He is best known for his martial arts and action genre films ",
    time: "May,05",
  },
  {
    id: 3,
    src: "images/demo/img/5.jpg",
    title: "movie: Woriers",
    description: "Isaac Florentine is an Israeli film director. He is best known for his martial arts and action genre films ",
    time: "Apr,04",
  },
];
const openNotification = (res, movie) => {
  notification.open({
    message: res.message,
    description:
      res.status ? `movie "${movie?.title || ""}" deleted from watchlist` : "",
    onClick: () => {
      console.log('Notification Clicked!');
    },
    className: res.status ? "bg-success" : "",
    style: { backgroundColor: !res.status ? "#410000" : "" }
  });
};

const WatchListMovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  return (
    <div className="product">

      <img src={movie.image} alt="" />

      <div className="product-info col-6">

        <h3 className="product-name text-white">{movie.title}</h3>

        <p className="product-price">{movie.description}</p>

        {/* <h4 className="product-offer"></h4> */}

      </div>
      <div className="product-info">
        <p className="product-remove" onClick={() => dispatch(actions.deleteMovieFromWatchList(movie)).then(response => { openNotification(response, movie); })}>

          <i className="fa fa-trash" aria-hidden="true"></i>

          <span className="remove mx-1">Remove</span>

        </p>
      </div>

    </div>
  );
}

export const WatchListPage = () => {
  const { currentState, isAuthorized } = useSelector(
    (state) => ({ currentState: state.watchList, isAuthorized: state.auth.user != null, }),
    shallowEqual
  );
  const navigate = useNavigate();
  const { totalCount, entities, listLoading } = currentState;
  console.log(entities);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getWatchList());
    if (!isAuthorized) {
      openNotification({ message: "Please login first!", status: false })
      navigate("/auth")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  return (
    <section className="text-white">
      <div className="wrapper bgded overlay"
      // style={{ backgroundImage: "url(images/demo/bg2.jpeg)" }}
      >

        <main className="hoc container clear">
          <header className="heading"><u>Watchlist</u></header><br /><br />

          <div className="products">
            {listLoading ? <div className="d-flex align-items-center justify-content-center"><div className="spinner-border text-light" role="status"></div></div> :
              entities?.length < 1 ? <p className="text-center">No Record Found</p> : entities?.map(movie => (<WatchListMovieCard key={movie._id} movie={movie} />))}
          </div>

        </main>
      </div>
    </section>
  );
};
