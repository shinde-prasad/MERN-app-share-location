import React from "react";

const ItemsList = ({ list }) => {
    if (!list) {
        return <div>No items to display</div>;
    }
    return (
        <React.Fragment key="items-list">
            <ul>
                test-{list}
                {list.map((item) => (
                    <li key={item.toString()}>{item}</li>
                ))}
            </ul>
        </React.Fragment>
    )
}

export default ItemsList;