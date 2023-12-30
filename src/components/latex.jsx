import React, { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-latex';
import 'ace-builds/src-noconflict/theme-github';
import TemplateSelector from './TemplateSelector';
import loadTemplate from '../services/templateService';
import { useNavigate } from 'react-router-dom';
import './Editor.css';
import logo from './logo.png';

const LatexEditor = () => {
    const navigate = useNavigate();

    const [latexCode, setLatexCode] = useState('');
    const [templates, setTemplates] = useState([]);
    const [pdfContent, setPdfContent] = useState(null);
    const [image, setImage] = useState(null); // State for the uploaded image

    const editorStyle = {
        width: '900px',
        height: '600px',
        fontSize: '20px'
    };

    useEffect(() => {
        loadDefaultTemplate();
        loadTemplateList();
    }, []);

    const loadDefaultTemplate = async () => {
        try {
            const defaultTemplate = await loadTemplate('default-template');
            setLatexCode(defaultTemplate);
        } catch (error) {
            console.error('Error loading default template:', error);
        }
    };

    const loadTemplateList = async () => {
        try {
            const response = await fetch('http://localhost:3001/templates');
            if (!response.ok) {
                throw new Error('Failed to fetch templates');
            }
            const fetchedTemplates = await response.json();
            setTemplates(fetchedTemplates);
        } catch (error) {
            console.error('Error fetching templates:', error);
        }
    };

    const handleTemplateSelect = async (templateName) => {
        try {
            const selectedTemplate = await loadTemplate(templateName);
            setLatexCode(selectedTemplate);
        } catch (error) {
            console.error('Error loading selected template:', error);
        }
    };

    const handleCompile = async () => {
        try {
            const formData = new FormData();
            formData.append('latexCode', latexCode);
            formData.append('image', image); // Append the image to the form data

            const response = await fetch('http://localhost:3001/compile', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Compilation failed');
            }

            const compiledOutput = await response.arrayBuffer();
            console.log('Compiled Output:', compiledOutput);
            setPdfContent(compiledOutput);
        } catch (error) {
            console.error('Error compiling LaTeX code:', error);
        }
    };

    const handleGoBack = () => {
        navigate('/');
    };

    const handleChange = (newCode) => {
        setLatexCode(newCode);
    };

    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        setImage(selectedImage);
    };

    return (
        <div className={'envelope'}>
            <div id={'heading'}>
                <img id="logo" src={logo} alt={'Cv Gen LOGO'} />
                <button className={'editor-button left'} onClick={handleGoBack}>
                    Go Back
                </button>
            </div>
            <div className="editor-container">
                <div className="editor-section">
                    <TemplateSelector templates={templates} onSelectTemplate={handleTemplateSelect} />
                    <AceEditor
                        mode="latex"
                        theme="github"
                        onChange={handleChange}
                        name="latex-editor"
                        value={latexCode}
                        editorProps={{ $blockScrolling: true }}
                        style={editorStyle}
                        fontSize={18}
                    />
                    <input type="file" onChange={handleImageChange} />
                    <button className="editor-button" onClick={handleCompile}>
                        Compile
                    </button>
                </div>
                {pdfContent && (
                    <div className="compiled-pdf">
                        <h3>Compiled PDF</h3>
                        <iframe
                            title="Compiled PDF"
                            src={URL.createObjectURL(new Blob([pdfContent], { type: 'application/pdf' }))}
                            width="100%"
                            height="100%"
                        ></iframe>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LatexEditor;
