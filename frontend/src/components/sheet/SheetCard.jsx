

const SheetCard = ({image, title, description, btnTitle="Explore Now", id}) => {
    return (
        <div className="card bg-base-100 image-full w-96 shadow-sm">
            <figure>
                <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{description}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">{btnTitle}</button>
                </div>
            </div>
        </div>
    )
}

export default SheetCard