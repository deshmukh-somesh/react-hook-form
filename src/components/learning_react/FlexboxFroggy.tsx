import { useState, useEffect, useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { css } from '@codemirror/lang-css';
import { oneDark } from '@codemirror/theme-one-dark';

// Game levels configuration

const LEVELS = [
    {
        id: 1,
        instruction: "Welcome to Flexbox Froggy! Your goal is to help the frogs reach their lily pads by writing CSS flexbox code. For this first level, use the justify-content property to center all the frogs.",
        solution: "justify-content: center;",
        frogs: [{ id: 1, color: 'green' }, { id: 2, color: 'yellow' }, { id: 3, color: 'red' }],
        lilyPads: [{ id: 1, color: 'green', position: 'center-1' }, { id: 2, color: 'yellow', position: 'center-2' }, { id: 3, color: 'red', position: 'center-3' }],
        allowedProperties: ['justify-content']
    },
    {
        id: 2,
        instruction: "The lily pads are on the right side. Use justify-content to move all the frogs to the end of the pond.",
        solution: "justify-content: flex-end;",
        frogs: [{ id: 1, color: 'green' }, { id: 2, color: 'blue' }, { id: 3, color: 'purple' }],
        lilyPads: [{ id: 1, color: 'green', position: 'flex-end-1' }, { id: 2, color: 'blue', position: 'flex-end-2' }, { id: 3, color: 'purple', position: 'flex-end-3' }],
        allowedProperties: ['justify-content']
    },
    {
        id: 3,
        instruction: "When frogs are at both sides of the pond, they have maximum space between them. Use justify-content to position the frogs at the start and end.",
        solution: "justify-content: space-between;",
        frogs: [{ id: 1, color: 'green' }, { id: 2, color: 'red' }],
        lilyPads: [{ id: 1, color: 'green', position: 'flex-start' }, { id: 2, color: 'red', position: 'flex-end' }],
        allowedProperties: ['justify-content']
    },
    {
        id: 4,
        instruction: "Now the lily pads are arranged with equal space around each one. Use the justify-content property to position the frogs.",
        solution: "justify-content: space-around;",
        frogs: [{ id: 1, color: 'green' }, { id: 2, color: 'yellow' }],
        lilyPads: [{ id: 1, color: 'green', position: 'space-around-1' }, { id: 2, color: 'yellow', position: 'space-around-2' }],
        allowedProperties: ['justify-content']
    },
    {
        id: 5,
        instruction: "Now try distributing three frogs evenly with justify-content. There should be equal space between each frog.",
        solution: "justify-content: space-evenly;",
        frogs: [{ id: 1, color: 'green' }, { id: 2, color: 'yellow' }, { id: 3, color: 'red' }],
        lilyPads: [{ id: 1, color: 'green', position: 'space-evenly-1' }, { id: 2, color: 'yellow', position: 'space-evenly-2' }, { id: 3, color: 'red', position: 'space-evenly-3' }],
        allowedProperties: ['justify-content']
    },
    {
        id: 6,
        instruction: "The frogs need to move to the bottom of the pond. Use align-items to move them all down.",
        solution: "align-items: flex-end;",
        frogs: [{ id: 1, color: 'green' }, { id: 2, color: 'yellow' }, { id: 3, color: 'blue' }, { id: 4, color: 'red' }],
        lilyPads: [{ id: 1, color: 'green', position: 'bottom-1' }, { id: 2, color: 'yellow', position: 'bottom-2' }, { id: 3, color: 'blue', position: 'bottom-3' }, { id: 4, color: 'red', position: 'bottom-4' }],
        allowedProperties: ['align-items']
    },
    {
        id: 7,
        instruction: "Perfect! Now center all the frogs both horizontally and vertically in the pond.",
        solution: "justify-content: center;\nalign-items: center;",
        frogs: [{ id: 1, color: 'green' }, { id: 2, color: 'yellow' }, { id: 3, color: 'red' }],
        lilyPads: [{ id: 1, color: 'green', position: 'center-center-1' }, { id: 2, color: 'yellow', position: 'center-center-2' }, { id: 3, color: 'red', position: 'center-center-3' }],
        allowedProperties: ['justify-content', 'align-items']
    },
    {
        id: 8,
        instruction: "The frogs need to be in the bottom-right corner. Use both justify-content and align-items.",
        solution: "justify-content: flex-end;\nalign-items: flex-end;",
        frogs: [{ id: 1, color: 'green' }, { id: 2, color: 'red' }],
        lilyPads: [{ id: 1, color: 'green', position: 'bottom-right-1' }, { id: 2, color: 'red', position: 'bottom-right-2' }],
        allowedProperties: ['justify-content', 'align-items']
    },
    {
        id: 9,
        instruction: "Help these frogs get to their lily pads. You'll need to use flex-direction to change the direction of the flex container and reverse their order.",
        solution: "flex-direction: row-reverse;",
        frogs: [{ id: 1, color: 'green' }, { id: 2, color: 'yellow' }, { id: 3, color: 'blue' }],
        lilyPads: [{ id: 3, color: 'blue', position: 'row-reverse-1' }, { id: 2, color: 'yellow', position: 'row-reverse-2' }, { id: 1, color: 'green', position: 'row-reverse-3' }],
        allowedProperties: ['flex-direction']
    },
    {
        id: 10,
        instruction: "Help the frogs get to their lily pads. Use flex-direction to stack them vertically and justify-content to move them down.",
        solution: "flex-direction: column;\njustify-content: flex-end;",
        frogs: [{ id: 1, color: 'green' }, { id: 2, color: 'yellow' }],
        lilyPads: [{ id: 1, color: 'green', position: 'column-end-1' }, { id: 2, color: 'yellow', position: 'column-end-2' }],
        allowedProperties: ['flex-direction', 'justify-content']
    },
    {
        id: 11,
        instruction: "Help the frogs get to their lily pads. Use flex-direction to stack them in reverse vertical order.",
        solution: "flex-direction: column-reverse;",
        frogs: [{ id: 1, color: 'green' }, { id: 2, color: 'yellow' }],
        lilyPads: [{ id: 2, color: 'yellow', position: 'column-reverse-1' }, { id: 1, color: 'green', position: 'column-reverse-2' }],
        allowedProperties: ['flex-direction']
    },
    {
        id: 12,
        instruction: "The frogs need to be in the bottom-left corner, but the container is in column direction. Use flex-direction, justify-content, and align-items.",
        solution: "flex-direction: column;\njustify-content: flex-end;\nalign-items: flex-start;",
        frogs: [{ id: 1, color: 'green' }, { id: 2, color: 'red' }],
        lilyPads: [{ id: 1, color: 'green', position: 'column-bottom-left-1' }, { id: 2, color: 'red', position: 'column-bottom-left-2' }],
        allowedProperties: ['flex-direction', 'justify-content', 'align-items']
    },
    {
        id: 13,
        instruction: "Only the yellow frog needs to go to the bottom while the others stay at the top. Use align-self to move just this frog.",
        solution: "align-self: flex-end;",
        frogs: [{ id: 1, color: 'green' }, { id: 2, color: 'red' }, { id: 3, color: 'yellow', special: true }, { id: 4, color: 'blue' }],
        lilyPads: [{ id: 1, color: 'green', position: 'top-1' }, { id: 2, color: 'red', position: 'top-2' }, { id: 3, color: 'yellow', position: 'bottom' }, { id: 4, color: 'blue', position: 'top-3' }],
        allowedProperties: ['align-self'],
        applyToFrog: 3
    },
    {
        id: 14,
        instruction: "This pond has lots of frogs! Use order to rearrange them. The green frog should be last.",
        solution: "order: 5;",
        frogs: [{ id: 1, color: 'green', special: true }, { id: 2, color: 'yellow' }, { id: 3, color: 'red' }, { id: 4, color: 'blue' }],
        lilyPads: [{ id: 2, color: 'yellow', position: 'order-1' }, { id: 3, color: 'red', position: 'order-2' }, { id: 4, color: 'blue', position: 'order-3' }, { id: 1, color: 'green', position: 'order-4' }],
        allowedProperties: ['order'],
        applyToFrog: 1
    },
    {
        id: 15,
        instruction: "The red frog wants to be first in line. Give it a negative order value to move it to the front.",
        solution: "order: -1;",
        frogs: [{ id: 1, color: 'green' }, { id: 2, color: 'yellow' }, { id: 3, color: 'red', special: true }],
        lilyPads: [{ id: 3, color: 'red', position: 'order-first' }, { id: 1, color: 'green', position: 'order-second' }, { id: 2, color: 'yellow', position: 'order-third' }],
        allowedProperties: ['order'],
        applyToFrog: 3
    },
    {
        id: 16,
        instruction: "The pond is overflowing with frogs! Use flex-wrap to allow them to wrap to a new line.",
        solution: "flex-wrap: wrap;",
        frogs: [{ id: 1, color: 'green' }, { id: 2, color: 'yellow' }, { id: 3, color: 'red' }, { id: 4, color: 'blue' }, { id: 5, color: 'purple' }, { id: 6, color: 'orange' }, { id: 7, color: 'pink' }],
        lilyPads: [{ id: 1, color: 'green', position: 'wrap-1' }, { id: 2, color: 'yellow', position: 'wrap-2' }, { id: 3, color: 'red', position: 'wrap-3' }, { id: 4, color: 'blue', position: 'wrap-4' }, { id: 5, color: 'purple', position: 'wrap-5' }, { id: 6, color: 'orange', position: 'wrap-6' }, { id: 7, color: 'pink', position: 'wrap-7' }],
        allowedProperties: ['flex-wrap']
    },
    {
        id: 17,
        instruction: "Use flex-direction and flex-wrap together. You can use the shorthand property flex-flow.",
        solution: "flex-flow: column wrap;",
        frogs: [{ id: 1, color: 'green' }, { id: 2, color: 'yellow' }, { id: 3, color: 'red' }],
        lilyPads: [{ id: 1, color: 'green', position: 'column-wrap-1' }, { id: 2, color: 'yellow', position: 'column-wrap-2' }, { id: 3, color: 'red', position: 'column-wrap-3' }],
        allowedProperties: ['flex-flow']
    },
    {
        id: 18,
        instruction: "The frogs have wrapped to multiple lines. Use align-content to pack them towards the start.",
        solution: "flex-wrap: wrap;\nalign-content: flex-start;",
        frogs: [{ id: 1, color: 'green' }, { id: 2, color: 'yellow' }, { id: 3, color: 'red' }, { id: 4, color: 'blue' }],
        lilyPads: [{ id: 1, color: 'green', position: 'content-start-1' }, { id: 2, color: 'yellow', position: 'content-start-2' }, { id: 3, color: 'red', position: 'content-start-3' }, { id: 4, color: 'blue', position: 'content-start-4' }],
        allowedProperties: ['flex-wrap', 'align-content']
    },
    {
        id: 19,
        instruction: "Now use align-content to pack the wrapped lines towards the end with space between them.",
        solution: "flex-wrap: wrap;\nalign-content: space-between;",
        frogs: [{ id: 1, color: 'green' }, { id: 2, color: 'yellow' }, { id: 3, color: 'red' }, { id: 4, color: 'blue' }],
        lilyPads: [{ id: 1, color: 'green', position: 'content-between-1' }, { id: 2, color: 'yellow', position: 'content-between-2' }, { id: 3, color: 'red', position: 'content-between-3' }, { id: 4, color: 'blue', position: 'content-between-4' }],
        allowedProperties: ['flex-wrap', 'align-content']
    },
    {
        id: 20,
        instruction: "Welcome to the final level! Use everything you've learned about flexbox to help all the frogs reach their lily pads. This pond requires flex-direction, justify-content, align-items, and flex-wrap.",
        solution: "flex-direction: column;\nflex-wrap: wrap;\njustify-content: center;\nalign-items: center;",
        frogs: [{ id: 1, color: 'green' }, { id: 2, color: 'yellow' }, { id: 3, color: 'red' }, { id: 4, color: 'blue' }, { id: 5, color: 'purple' }],
        lilyPads: [{ id: 1, color: 'green', position: 'final-1' }, { id: 2, color: 'yellow', position: 'final-2' }, { id: 3, color: 'red', position: 'final-3' }, { id: 4, color: 'blue', position: 'final-4' }, { id: 5, color: 'purple', position: 'final-5' }],
        allowedProperties: ['flex-direction', 'flex-wrap', 'justify-content', 'align-items']
    }
]


const FlexboxFroggy = () => {
    //Game State
    const [currentLevel, setCurrentLevel] = useState(0);
    const [userCSS, setUserCSS] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);
    const [hint, setHint] = useState('');

    // Get current level data: 
    const level = LEVELS[currentLevel];

    const checkSolution = useCallback(() => {
        const normalizeCSS = (css: any) => {
            return css
                .trim()
                .toLowerCase()
                .replace(/\s+/g, ' ')
                .replace(/;\s*$/, '') // Remove trailing semicolon
                .replace(/:\s+/g, ':') // Normalize colons
                .replace(/\s*;\s*/g, ';'); // Normalize semicolons
        }

        const userNormalized = normalizeCSS(userCSS);
        const solutionNormalized = normalizeCSS(level.solution);

        // also check for alternative solution - that needs to be built still not building that . 
        const isCorrect = userNormalized === solutionNormalized;

        return isCorrect;
    }, [userCSS, level])

    const showHint = () => {
        const hints: { [key: string]: string } = {
            // Main axis alignment
            'justify-content': 'justify-content aligns items along the main axis (horizontally by default). Try: flex-start, center, flex-end, space-between, space-around, space-evenly',

            // Cross axis alignment
            'align-items': 'align-items aligns items along the cross axis (vertically by default). Try: flex-start, center, flex-end, stretch, baseline',

            // Individual item alignment
            'align-self': 'align-self aligns a single item along the cross axis, overriding align-items. Try: auto, flex-start, center, flex-end, stretch, baseline',

            // Direction control
            'flex-direction': 'flex-direction sets the main axis direction. Try: row (default), row-reverse, column, column-reverse',

            // Wrapping control
            'flex-wrap': 'flex-wrap controls whether items wrap to new lines. Try: nowrap (default), wrap, wrap-reverse',

            // Shorthand for direction and wrap
            'flex-flow': 'flex-flow is shorthand for flex-direction and flex-wrap. Try: row wrap, column nowrap, row-reverse wrap',

            // Multi-line alignment
            'align-content': 'align-content aligns wrapped lines along the cross axis. Only works with flex-wrap. Try: flex-start, center, flex-end, space-between, space-around, space-evenly, stretch',

            // Item ordering
            'order': 'order controls the order of items without changing HTML. Default is 0. Try: positive numbers (1, 2, 3...) or negative numbers (-1, -2...)',

            // Item growth
            'flex-grow': 'flex-grow defines how much an item should grow relative to other items. Try: 0 (default), 1, 2, 3...',

            // Item shrinking
            'flex-shrink': 'flex-shrink defines how much an item should shrink relative to other items. Try: 1 (default), 0, 2, 3...',

            // Item base size
            'flex-basis': 'flex-basis defines the initial size of an item before free space is distributed. Try: auto (default), 0, 100px, 50%, content',

            // Shorthand for grow, shrink, basis
            'flex': 'flex is shorthand for flex-grow, flex-shrink, and flex-basis. Try: 1 (grow), 0 0 auto (no grow/shrink), 1 1 100px'
        };

        const property = level.allowedProperties[0];
        setHint(hints[property] || "Check the flexbox documentation!")
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
    }, [userCSS, checkSolution])


    const getLilyPadContainerStyles = (): React.CSSProperties => {
        const baseStyles: Record<string, string | number> = {
            display: 'flex',
            height: '100%',
            width: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            pointerEvents: 'none',
            padding: "20px",
            gap: "30px"
        };

        if (level.solution.trim()) {
            const cssRules = level.solution.split(';').filter(rule => rule.trim());
            cssRules.forEach(rule => {
                const [property, value] = rule.split(':').map(s => s.trim());
                if (property && value) {
                    console.log(property, value);
                    const camelCaseProperty = property.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                    baseStyles[camelCaseProperty] = value;
                }
            });
        }


        // For wrap demos, we need to constrain the width so items actually wrap
        if (level.id === 16) {
            baseStyles.width = '60%'; // Constrain width to force wrapping
        }
        if (level.id === 17 || level.id === 18 || level.id === 19) {
            baseStyles.height = '60%'; // Constrain height for column wrapping
        }
        if (level.id === 20) {
            baseStyles.width = '70%';
            baseStyles.height = '70%';
        }

        return baseStyles;
    };

    const getFrogContainerStyles = () => {
        const baseStyles: Record<string, string | number> = {
            display: 'flex',
            height: '100%',
            width: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            padding: "20px",
            gap: "30px"
        };

        // Parse user CSS and apply it to position frogs
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

        // For wrap demos, we need to constrain the width so items actually wrap
        if (level.id === 16) {
            baseStyles.width = '60%'; // Constrain width to force wrapping
        }
        if (level.id === 17 || level.id === 18 || level.id === 19) {
            baseStyles.height = '60%'; // Constrain height for column wrapping
        }
        if (level.id === 20) {
            baseStyles.width = '70%';
            baseStyles.height = '70%';
        }

        return baseStyles;
    };

    // Add these two new functions to handle individual item styling

    const getLilyPadStyles = (pad: any): React.CSSProperties => {
        const baseStyles: Record<string, string | number> = {
            // Your existing lily pad base styles
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(4px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            flexShrink: 0,
            // Add background color based on pad.color
            backgroundColor: pad.color === 'green' ? 'rgba(34, 197, 94, 0.7)' :
                pad.color === 'yellow' ? 'rgba(234, 179, 8, 0.7)' :
                    pad.color === 'purple' ? 'rgba(147, 51, 234, 0.7)' :
                        pad.color === 'blue' ? 'rgba(59, 130, 246, 0.7)' :
                            'rgba(244, 63, 94, 0.7)' // red as fallback
        };

        // Apply solution CSS to specific lily pad if this level targets individual items
        if (level.applyToFrog && pad.id === level.applyToFrog && level.solution.trim()) {
            const cssRules = level.solution.split(';').filter(rule => rule.trim());
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

    const getFrogStyles = (frog: any): React.CSSProperties => {
        const baseStyles: Record<string, string | number> = {
            // Your existing frog base styles
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '40px',
            transition: 'all 0.3s ease',
            flexShrink: 0,
            // Add frog-specific styling
            // backgroundColor: frog.color === 'green' ? 'rgba(34, 197, 94, 0.9)' :
            //     frog.color === 'yellow' ? 'rgba(234, 179, 8, 0.9)' :
            //         frog.color === 'purple' ? 'rgba(147, 51, 234, 0.9)' :
            //             frog.color === 'blue' ? 'rgba(59, 130, 246, 0.9)' :
            //                 'rgba(244, 63, 94, 0.9)', // red as fallback
            // border: '2px solid rgba(255, 255, 255, 0.4)',
            // boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
        };

        // Apply user CSS to specific frog if this level targets individual items
        if (level.applyToFrog && frog.id === level.applyToFrog && userCSS.trim()) {
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


    const getPondStyles = (): React.CSSProperties => {
        return {
            // display: "flex",
            minHeight: '65vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            padding: '20px',
            position: 'relative',
            overflow: 'hidden',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        };
    };

    const isFrogCorrectlyPositioned = () => {
        return userCSS.trim() && checkSolution();
    }
    const handleNext = () => {
        if (currentLevel < LEVELS.length - 1) {
            setCurrentLevel(() => currentLevel + 1)
            setUserCSS('');
            setIsCompleted(false);
            setHint('');
        }
    }

    const handlePrevious = () => {
        if (currentLevel > 0) {
            setCurrentLevel(() => currentLevel - 1);
            setUserCSS('');
            setIsCompleted(false);
            setHint('');
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-500/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-pink-500/5 to-violet-500/5 rounded-full blur-3xl animate-bounce" style={{ animationDuration: '6s' }}></div>
            </div>

            <div className="relative z-10 p-4 sm:p-6 lg:p-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/5 backdrop-blur-lg rounded-full border border-white/10">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                            <span className="text-white/80 text-xs sm:text-sm font-medium">Interactive Learning Platform</span>
                        </div>
                        <div className='flex items-center justify-center gap-4 '>
                            <h1 className='text-4xl sm:text-5xl lg:text-6xl font-black '>
                                <img className="h-12 w-12 " src="/src/assets/images/frog-green.svg" alt="" />
                            </h1>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4 tracking-tight">
                                Flexbox Froggy
                            </h1>
                        </div>

                        <p className="text-base sm:text-lg lg:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
                            Learn CSS Flexbox by helping frogs reach their lily pads!
                        </p>
                    </div>
                </div>

                {/* Main Layout - Keep your exact width structure */}
                <div className='flex flex-col lg:flex-row gap-6 lg:gap-10 max-w-9xl mx-auto'>
                    {/* Left Column - Same w-1/2 structure */}
                    <div className='w-full lg:w-1/2 min-h-screens flex flex-col'>
                        {/* Level Info */}
                        <div className="bg-white/10 backdrop-blur-2xl rounded-2xl lg:rounded-3xl border border-white/20 shadow-2xl p-4 sm:p-6 mb-6 hover:shadow-purple-500/25 transition-all duration-500 hover:scale-[1.02]">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                                        <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                                            Challenge {level.id}
                                        </span>
                                    </div>
                                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                                        Level {level.id} <span className="text-white/50">of {LEVELS.length}</span>
                                    </h2>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={showHint}
                                        className="group px-3 sm:px-4 py-2 text-sm bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-yellow-500/50 transform hover:scale-105 transition-all duration-300 hover:-translate-y-1"
                                    >
                                        <span className="group-hover:animate-bounce inline-block">💡</span>
                                        <span className="ml-1">Hint</span>
                                    </button>
                                    <button
                                        onClick={handleReset}
                                        className="group px-3 sm:px-4 py-2 text-sm bg-white/10 backdrop-blur-lg text-white rounded-xl font-semibold border border-white/20 hover:bg-white/20 transform hover:scale-105 transition-all duration-300 hover:-translate-y-1"
                                    >
                                        <span className="group-hover:animate-spin inline-block">🔄</span>
                                        <span className="ml-1">Reset</span>
                                    </button>
                                </div>
                            </div>

                            <p className="text-white/80 text-sm sm:text-base lg:text-lg leading-relaxed">{level.instruction}</p>

                            {hint && (
                                <div className="mt-4 p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl backdrop-blur-lg animate-fadeIn">
                                    <p className="text-yellow-100 text-sm sm:text-base">
                                        <span className="inline-block animate-bounce mr-2">💡</span>
                                        <strong>Pro Tip:</strong> {hint}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Code Editor */}
                        <div className="bg-slate-900/50 backdrop-blur-2xl rounded-2xl lg:rounded-3xl border border-white/10 shadow-2xl p-3 sm:p-4 lg:p-6 min-h-[62vh]">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                </div>
                                <h3 className="text-white text-base sm:text-lg lg:text-xl font-bold ml-2">CSS Playground</h3>
                                <button
                                    className="px-3 py-1 bg-slate-600 hover:bg-slate-500 text-white rounded-lg text-sm transition-all disabled:opacity-50"
                                    onClick={handlePrevious}
                                    disabled={currentLevel === 0}
                                >
                                    ← Previous
                                </button>
                                <button
                                    className="px-3 py-1 bg-slate-600 hover:bg-slate-500 text-white rounded-lg text-sm transition-all disabled:opacity-50"
                                    onClick={handleNext}
                                    disabled={currentLevel >= LEVELS.length - 1}
                                >
                                    Next →
                                </button>
                            </div>

                            <div className="bg-slate-800/80 backdrop-blur-lg rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 border border-slate-700/50 min-h-[52vh]">
                                <div className="text-emerald-400 mb-2 font-mono text-sm sm:text-base lg:text-lg">#pond {'{'}</div>
                                <div className="text-slate-400 ml-4 mb-1 font-mono text-sm sm:text-base">display: flex;</div>

                                <div className="ml-4">
                                    <CodeMirror
                                        value={userCSS}
                                        onChange={(value) => {
                                            setUserCSS(value);
                                            setIsCompleted(false);
                                        }}
                                        extensions={[css()]}
                                        theme={oneDark}
                                        placeholder="/* Write your flexbox magic here */"
                                        basicSetup={{
                                            lineNumbers: true,
                                            // autocompletion: true,
                                            bracketMatching: true,
                                            closeBrackets: true,
                                            highlightSelectionMatches: false,
                                            searchKeymap: false,
                                        }}
                                        style={{
                                            fontSize: window.innerWidth < 640 ? "14px" : "16px",
                                            fontFamily: "JetBrains Mono, Monaco, Consolas, monospace",
                                            backgroundColor: "transparent"
                                        }}
                                    />
                                </div>
                                <div className="text-emerald-400 font-mono text-sm sm:text-base lg:text-lg">{'}'}</div>
                            </div>
                            {isCompleted && (
                                <div className="mt-4 p-4 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 rounded-xl backdrop-blur-lg animate-slideUp">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-2xl animate-bounce">🎉</span>
                                        <div>
                                            <p className="text-emerald-100 font-bold text-lg">Level Completed!</p>
                                            <p className="text-emerald-200/80 text-sm">You're becoming a Flexbox master!</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={nextLevel}
                                        className="w-full sm:w-auto mt-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl font-bold shadow-lg hover:shadow-emerald-500/50 transform hover:scale-105 transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={currentLevel >= LEVELS.length - 1}
                                    >
                                        {currentLevel < LEVELS.length - 1 ? '🚀 Next Level →' : 'Game Complete! 🏆'}
                                    </button>
                                </div>
                            )}

                        </div>
                    </div>

                    {/* Right Column - Same w-1/2 structure */}
                    <div className='w-full lg:w-1/2 flex flex-col gap-5'>
                        {/* Progress Bar */}
                        <div className="bg-white/10 backdrop-blur-2xl rounded-2xl lg:rounded-3xl border border-white/20 shadow-2xl p-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-white/80">Learning Progress</span>
                                <span className="text-sm text-white/60 font-mono">
                                    {currentLevel + 1} / {LEVELS.length}
                                </span>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full transition-all duration-1000 ease-out shadow-lg shadow-emerald-500/50"
                                    style={{ width: `${((currentLevel + 1) / LEVELS.length) * 100}%` }}
                                />
                            </div>
                            <p className="text-white/60 text-xs mt-2">
                                {Math.round(((currentLevel + 1) / LEVELS.length) * 100)}% Complete
                            </p>
                        </div>

                        {/* Pond Visualization */}
                        <div className="bg-white/10 backdrop-blur-2xl rounded-2xl lg:rounded-3xl border border-white/20 shadow-2xl p-4 min-h-[70vh] hover:shadow-cyan-500/25 transition-all duration-500">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-xl sm:text-2xl">🌊</span>
                                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white">Magical Pond</h3>
                            </div>

                            <div
                                style={getPondStyles()}
                                className="relative overflow-hidden "
                            >
                                {/* Animated water ripples */}
                                <div className="absolute inset-0 opacity-20">
                                    <div className="absolute top-1/4 left-1/4 w-24 sm:w-32 h-24 sm:h-32 border border-white/30 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
                                    <div className="absolute bottom-1/3 right-1/3 w-16 sm:w-24 h-16 sm:h-24 border border-white/20 rounded-full animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
                                </div>

                                {/* Lily Pads Container - positioned using SOLUTION CSS */}
                                <div style={getLilyPadContainerStyles()}>
                                    {level.lilyPads.map(pad => (
                                        <div
                                            key={`pad-${pad.id}`}
                                            className="w-20 h-20 sm:w-25 sm:h-25 lg:w-26 lg:h-26 rounded-full border-2 border-white/30 backdrop-blur-sm shadow-2xl flex-shrink-0"
                                            // backgroundColor: pad.color === 'green' ? 'rgba(34, 197, 94, 0.7)' :
                                            //     pad.color === 'yellow' ? 'rgba(234, 179, 8, 0.7)' :
                                            //         pad.color === 'purple' ? 'rgba(147, 51, 234, 0.7)' :
                                            //             pad.color === 'blue' ? 'rgba(59, 130, 246, 0.7)' :
                                            //                 'rgba(244, 63, 94, 0.7)', // red as fallback
                                            // boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                                            
                                            style={getLilyPadStyles(pad)}
                                        />
                                    ))}
                                </div>

                                <div style={getFrogContainerStyles()}>
                                    {/* Frogs */}
                                    {level.frogs.map(frog => (
                                        <div
                                            key={`frog-${frog.id}`}
                                            // className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center text-xl sm:text-2xl lg:text-3xl shadow-2xl border-2 border-white/20 backdrop-blur-sm transition-all duration-500 hover:scale-110 animate-pulse"
                                            className={`w-20 h-20 sm:w-25 sm:h-25 lg:w-30 lg:h-30 rounded-full flex items-center justify-center text-xl sm:text-2xl lg:text-3xl backdrop-blur-0 shadow-sm ${isFrogCorrectlyPositioned() ? '' : 'animate-bounce'}`}
                                        // style={{
                                        //     backgroundColor: frog.color === 'green' ? 'rgba(22, 163, 74, 0.9)' : 'rgba(220, 20, 60, 0.9)',
                                        //     color: 'white',
                                        //     boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                                        //     animationDuration: '2s'
                                        // }}
                                        style={getFrogStyles(frog)}
                                        >
                                            <img className='h-16 w-16' src={frog.color === "green" ? "/src/assets/images/frog-green.svg" : frog.color === "red" ? "/src/assets/images/frog-red.svg" : frog.color === "yellow" ? "/src/assets/images/frog-yellow.svg" : frog.color === "purple" ? "/src/assets/images/frog-purple.svg" : "/src/assets/images/frog-blue.svg"} alt={`${frog.color} frog bouncing`} />

                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Instructions */}
                <div className="mt-6 max-w-7xl mx-auto bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-2xl rounded-2xl lg:rounded-3xl border border-white/10 p-6 lg:p-8 shadow-2xl">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl lg:text-3xl">📚</span>
                        <h4 className="font-bold text-white text-lg sm:text-xl lg:text-2xl">How to Master Flexbox</h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                        <div className="flex items-start gap-3">
                            <span className="text-xl lg:text-2xl">✨</span>
                            <div>
                                <h5 className="text-white font-semibold mb-1 text-sm lg:text-base">Write CSS Magic</h5>
                                <p className="text-white/70 text-xs lg:text-sm">Use flexbox properties in the editor</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-xl lg:text-2xl">🎯</span>
                            <div>
                                <h5 className="text-white font-semibold mb-1 text-sm lg:text-base">Real-time Preview</h5>
                                <p className="text-white/70 text-xs lg:text-sm">Watch frogs move as you type</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-xl lg:text-2xl">🎨</span>
                            <div>
                                <h5 className="text-white font-semibold mb-1 text-sm lg:text-base">Perfect Alignment</h5>
                                <p className="text-white/70 text-xs lg:text-sm">Match frogs to their lily pads</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-xl lg:text-2xl">🚀</span>
                            <div>
                                <h5 className="text-white font-semibold mb-1 text-sm lg:text-base">Level Up</h5>
                                <p className="text-white/70 text-xs lg:text-sm">Get hints when you're stuck</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out;
                }
                
                .animate-slideUp {
                    animation: slideUp 0.5s ease-out;
                }
                
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}

export default FlexboxFroggy