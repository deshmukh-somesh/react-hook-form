import React, { useState, useEffect } from 'react';

// Game levels configuration
const LEVELS = [
    {
        id: 1,
        instruction: "Welcome to Flexbox Froggy! Your goal is to help the frog reach its lily pad by writing CSS flexbox code. For this first level, use the justify-content property to center the frog.",
        initialCSS: "",
        solution: "justify-content: center;",
        frogs: [{ id: 1, color: 'green' }],
        lilyPads: [{ id: 1, color: "green", position: 'center' }],
        allowedProperties: ['justify-content']
    },
    {
        id: 2,
        instruction: "The lily pad is on the right side. Use justify-content to move the frog to the end of the pond.",
        initialCSS: "",
        solution: "justify-content: flex-end;",
        frogs: [{ id: 1, color: 'green' }],
        lilyPads: [{ id: 1, color: 'green', position: 'flex-end' }],
        allowedProperties: ['justify-content']
    }
    // Add more levels as needed
]

const FlexboxFroggy = () => {

    //Geame State
    const [currentLevel, setCurrentLevel] = useState(0);
    const [userCSS, setUserCSS] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);
    const [hint, setHint] = useState('');

    // Get current level data: 
    const level = LEVELS[currentLevel];

    // check if the current solution is correct 
    const checkSolution = () => {

        console.log("check solution is triggerd!")
        const normalizedUserCSS = userCSS.trim().toLowerCase().replace(/\s+/g, ' ');
        console.log(normalizedUserCSS);
        const normalizedSolution = level.solution.toLowerCase().replace(/\s+/g, ' ');
        console.log(normalizedSolution)
        return normalizedUserCSS === normalizedSolution;
    }


    const handleCSSChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserCSS(e.target.value);
        console.log(e.target.value);
        setIsCompleted(false);
    }

    const showHint = () => {
        const hints: { [key: string]: string } = {
            'justify-content': 'justify-content aligns items horizontally. Try: flex-start, center, flex-end, space-between, space-around',
            'align-items': 'align-items aligns items vertically. Try: flex-start, center, flex-end, stretch'
        }

        const property = level.allowedProperties[0];
        setHint(hints[property] || "Check the fleexbox documentation!")
    }

    const handleReset = () => {
        setUserCSS("")
        setIsCompleted(false)
        setHint('')
    }


    // next level: 
    const nextLevel = () => {
        if (currentLevel < LEVELS.length - 1) {
            setCurrentLevel(currentLevel + 1);
            setUserCSS('');
            setIsCompleted(false);
            setHint('');
        }
    }


    useEffect(() => {
        if (userCSS.trim() && checkSolution()) {
            setIsCompleted(true);
            setHint("");
        }
    }, [userCSS])


    const getPondStyles = () => {
        const baseStyles: { [key: string]: string } = {
            display: 'flex',
            minHeight: '200px',
            background: 'linear-gradient(to bottom, #87CEEB 0%, #98D8E8 50%, #4682B4 100%)',
            border: '3px solid #228B22',
            borderRadius: '10px',
            padding: '20px',
            position: 'relative',
            overflow: 'hidden'
        };

        // Parse user CSS and apply it
        if (userCSS.trim()) {
            const cssRules = userCSS.split(';').filter(rule => rule.trim());
            cssRules.forEach(rule => {
                const [property, value] = rule.split(':').map(s => s.trim());
                if (property && value) {
                    const camelCaseProperty = property.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                    baseStyles[camelCaseProperty] = value;
                }
            });
        }

        return baseStyles;
    };


    // Get lily pad positions based on level
    const getLilyPadPosition = (position: string) => {
        const positions = {
            'center': { left: '50%', transform: 'translateX(-50%)' },
            'flex-end': { right: '20px' },
            'flex-start': { left: '20px' },
            'space-around-1': { left: '25%', transform: 'translateX(-50%)' },
            'space-around-2': { right: '25%', transform: 'translateX(50%)' },
            'center-vertical': { left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }
        };
        return positions[position as keyof typeof positions] || { left: '20px' };
    };


    return (
        <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-200 p-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-green-800 mb-2">🐸 Flexbox Froggy</h1>
                    <p className="text-lg text-green-700">Learn CSS Flexbox by helping frogs reach their lily pads!</p>
                </div>

                {/* Level Info */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-800">
                            Level {level.id} of {LEVELS.length}
                        </h2>
                        <div className="flex gap-2">
                            <button
                                onClick={showHint}
                                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                            >
                                💡 Hint
                            </button>
                            <button
                                onClick={handleReset}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                            >
                                🔄 Reset
                            </button>
                        </div>
                    </div>

                    <p className="text-gray-700 mb-4">{level.instruction}</p>

                    {hint && (
                        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4">
                            <p className="text-yellow-800">💡 <strong>Hint:</strong> {hint}</p>
                        </div>
                    )}
                </div>

                {/* Game Area */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Code Editor */}
                    <div className="bg-gray-900 rounded-lg p-4">
                        <h3 className="text-white text-lg font-bold mb-4">CSS Editor</h3>
                        <div className="bg-gray-800 rounded p-4">
                            <div className="text-green-400 mb-2">#pond {'{'}</div>
                            <div className="text-gray-400 ml-4 mb-1">display: flex;</div>
                            <textarea
                                value={userCSS}
                                onChange={handleCSSChange}
                                placeholder="/* Your CSS here */"
                                className="w-full bg-transparent text-white font-mono text-sm outline-none resize-none ml-4"
                                rows={3}
                                style={{ fontFamily: 'Monaco, Consolas, monospace' }}
                            />
                            <div className="text-green-400">{'}'}</div>
                        </div>

                        {isCompleted && (
                            <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded">
                                <p className="text-green-800 font-bold">🎉 Level Completed!</p>
                                <button
                                    onClick={nextLevel}
                                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                                    disabled={currentLevel >= LEVELS.length - 1}
                                >
                                    {currentLevel < LEVELS.length - 1 ? 'Next Level →' : 'Game Complete! 🏆'}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Pond Visualization */}
                    <div className="bg-white rounded-lg p-4">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Pond</h3>
                        <div
                            style={getPondStyles()}
                            className="relative"
                        >
                            {/* Lily Pads */}
                            {level.lilyPads.map(pad => (
                                <div
                                    key={`pad-${pad.id}`}
                                    className="absolute w-12 h-12 rounded-full opacity-60 border-2 border-green-600"
                                    style={{
                                        backgroundColor: pad.color === 'green' ? '#90EE90' : '#FFB6C1',
                                        ...getLilyPadPosition(pad.position)
                                    }}
                                />
                            ))}

                            {/* Frogs */}
                            {level.frogs.map(frog => (
                                <div
                                    key={`frog-${frog.id}`}
                                    className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-lg"
                                    style={{
                                        backgroundColor: frog.color === 'green' ? '#228B22' : '#DC143C',
                                        color: 'white'
                                    }}
                                >
                                    🐸
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-8 bg-white rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Progress</span>
                        <span className="text-sm text-gray-500">
                            {currentLevel + 1} / {LEVELS.length}
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-green-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${((currentLevel + 1) / LEVELS.length) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Instructions */}
                <div className="mt-6 bg-blue-50 rounded-lg p-4">
                    <h4 className="font-bold text-blue-800 mb-2">How to Play:</h4>
                    <ul className="text-blue-700 text-sm space-y-1">
                        <li>• Write CSS flexbox properties in the editor</li>
                        <li>• Watch the frogs move in real-time</li>
                        <li>• Get frogs to match their colored lily pads</li>
                        <li>• Use hints if you get stuck</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default FlexboxFroggy