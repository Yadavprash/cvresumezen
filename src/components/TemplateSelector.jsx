// src/components/TemplateSelector.js
import React from 'react';
import './Editor.css';

const TemplateSelector = ({ templates, onSelectTemplate }) => {
    return (
        <div>
            <h3>Select a Template:</h3>
            <select onChange={(e) => onSelectTemplate(e.target.value)}>
                {templates.map((template) => (
                    <option key={template.name} value={template.name}>
                        {template.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default TemplateSelector;
