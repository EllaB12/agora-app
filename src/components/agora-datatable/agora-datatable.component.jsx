import { Table } from 'antd';
import { useState } from 'react';

import './agora-datatable.styles.css';

const AgoraDatatable = ({ users, columns }) => {
    const [tableColumns, setTableColumns] = useState(columns);
    const [mouseDownX, setMouseDownX] = useState(null);
    const [beginDrag, setBeginDrag] = useState(false);
    const [draggedColumn, setDraggedColumn] = useState(null);

    const handleResize = (index) => (e) => {
        let timeoutId;

        if (!beginDrag || !mouseDownX || !draggedColumn || draggedColumn.key !== tableColumns[index].key) return;
        
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            setTableColumns(() => {
                const nextColumns = [...tableColumns];
                const deltaX = Math.round((e.clientX - mouseDownX) * 0.05);
                const column = nextColumns[index];
                nextColumns[index] = {
                  ...column,
                  width: Math.max(column.width + deltaX, 100),
                };
                return nextColumns;
              });
        }, 16)
    
      };
  
    const resizableColumns = tableColumns.map((col, index) => ({
      ...col,
      onHeaderCell: (column) => ({
        style: { cursor: 'col-resize' },
        width: column.width,
        onMouseDown: (e) => {
            setMouseDownX(e.clientX);
            setBeginDrag(true);
            setDraggedColumn(col);
        },
        onMouseMove: handleResize(index),
        onMouseUp: () => {
            setBeginDrag(false);
            setMouseDownX(null);
            setDraggedColumn(null);
        },
        onMouseLeave: () => {
            setBeginDrag(false);
            setMouseDownX(null);
            setDraggedColumn(null);
        }
      }),
    }));

    return (
        <Table className="table" columns={resizableColumns} dataSource={users} />
    )
}

export default AgoraDatatable;