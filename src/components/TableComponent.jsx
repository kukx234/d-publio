import React, { useState, useEffect, useRef } from "react";

const Table = ({ columns, data, maxHeightOffset = 20, onRowClick= ()=>{}}) => {
    const [maxHeight, setMaxHeight] = useState(300);
    const tableContainerRef = useRef(null);

    useEffect(() => {
        updateMaxHeight();
        window.addEventListener("resize", updateMaxHeight);
        return () => window.removeEventListener("resize", updateMaxHeight);
    }, [maxHeightOffset]);

    const updateMaxHeight = () => {
        if (tableContainerRef.current) {
            const viewportHeight = window.innerHeight;
            const offsetTop = tableContainerRef.current.getBoundingClientRect().top;
            const availableHeight = viewportHeight - offsetTop - maxHeightOffset;
            setMaxHeight(availableHeight);
        }
    };

    return (
        <div ref={tableContainerRef}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.key}>{column.label}</th>
                        ))}
                    </tr>
                </thead>

                <tbody style={{maxHeight: `${maxHeight}px`}}>
                    {data.map((row, index) => (
                        <tr key={index} onClick={() => (onRowClick(row._id))}>
                            {columns.map((column) => (
                                <td key={column.key}>
                                    {column.render
                                        ? column.render(row)
                                        : row[column.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
