const LatestTrend = () => {
    return (
        <div>
            <div style={{
                margin: '50px',
                justifyContent: 'center',
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center'
            }}>
                <div>
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/cde7e34c1fe2fe4f6702aae0021f927cf295e4f2c11e7ce6736a7b6476c55c47?"
                        className="aspect-[0.68] object-contain object-center w-full fill-yellow-400 overflow-hidden max-w-[28px]"
                        alt=""
                    />
                </div>
                <h1 style={{
                    fontSize: '40px',
                    marginLeft: '20px',
                    textDecoration: 'underline',
                    textDecorationColor: '#C7A4E3',
                    textDecorationThickness: '5px'
                }}>최신 동향 기술에 대해서 알아보세요!</h1>
            </div>
        </div>
    )
}

export default LatestTrend;