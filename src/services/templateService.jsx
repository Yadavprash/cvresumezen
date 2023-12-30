// src/services/templateService.js
const loadTemplate = async (templateName) => {
    try {
        const response = await fetch(`http://localhost:3001/templates/${templateName}.tex`);
        if (!response.ok) {
            throw new Error('Template not found');
        }
        // console.log(response);
        const data = await response.text();
        return data;
    } catch (error) {
        console.error('Error loading template:', error);
        throw error;
    }
};

export default loadTemplate;
