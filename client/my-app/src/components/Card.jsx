function Card({src ,title }) {
  return (
      <>
        <div className="card w-md shadow-xl rounded-4xl">
        <figure className="px-10 pt-10">
            <img
            src={`/src/assets/${src}`}
            alt="Shoes"
            className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
            <h2 className="card-title">Card Title</h2>
            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
            <div className="card-actions">
            <button className="btn btn-primary">Reservez maintenant</button>
            </div>
        </div>
        </div>
      </>
    )   
}   
export default Card;


