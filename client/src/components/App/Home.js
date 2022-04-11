function Home({ userName, userId }) {
  return (
    <div>
      <div className="home_title">
        <h1 className="slogen">Visualize your path {userName}</h1>

        <h3>
          Keep tracking your goal, your to do list and the overall path. Make
          things possible!!
        </h3>
      </div>
      <div className="img_box"></div>
    </div>
  );
}
export default Home;
