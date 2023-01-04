const ProductDisplay = ({name, img}) => {
    return ( 
        <div style={
            {width:"300px", 
            height:"300px", 
            backgroundColor:"lightgrey",
            display: "inline-block",
            margin : "0 10px"
            }
        }>
            <img src={require(`../img/${img}`)} height="200" alt="물건사진" />
            <h3>{name}</h3>
        </div>
    );
}
 
export default ProductDisplay;