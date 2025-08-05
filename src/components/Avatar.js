
function Avatar ({ avatar }) {
    return <div className="h-8 w-8 rounded-full mr-2 overflow-hidden bg-[#f5f6fa]">
        <img src={avatar} alt="profile pic" />
    </div>;
}

export default Avatar;