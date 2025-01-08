import React from 'react'

export const TaskItem = ({ task, onDelete }) => {
    return (
        <>
            <li className="flex justify-between items-center p-2 border-b border-gray-200">
                <span>{task.text}</span>
                <button onClick={() => onDelete(task.id)} className="text-red-500">Delete</button>
            </li>
        </>
    )
}
