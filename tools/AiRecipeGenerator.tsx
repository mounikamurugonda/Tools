'use client';

import React, { useState, useRef } from 'react';
import type { ToolProps } from '@/types';
import ToolContainer from '@/components/ToolContainer';
import { GoogleGenAI, Type } from '@google/genai';
import { marked } from 'marked';

const AiRecipeGenerator: React.FC<ToolProps> = ({ details }) => {
    const [ingredients, setIngredients] = useState('2 chicken breasts, 1 can of tomatoes, basil, pasta');
    const [diet, setDiet] = useState('');
    const [mealType, setMealType] = useState('dinner');
    const [recipeHtml, setRecipeHtml] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const hasGenerated = useRef(false);

    const generateRecipe = async () => {
        if (!ingredients.trim()) {
            setError('Please enter some ingredients.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setRecipeHtml('');
        hasGenerated.current = true;
        
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

            const schema = {
              type: Type.OBJECT,
              properties: {
                recipeName: { type: Type.STRING, description: "The name of the recipe." },
                description: { type: Type.STRING, description: "A short, enticing description of the dish." },
                ingredients: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "A list of ingredients with quantities."
                },
                instructions: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "The step-by-step cooking instructions."
                }
              },
              required: ["recipeName", "description", "ingredients", "instructions"]
            };

            let prompt = `Generate a creative recipe using the following ingredients: ${ingredients}.`;
            if (diet.trim()) {
              prompt += ` The recipe should be ${diet.trim()}.`;
            }
            if (mealType.trim()) {
              prompt += ` It should be for ${mealType.trim()}.`;
            }
            prompt += " Provide a name for the recipe, a short description, a list of ingredients with quantities, and step-by-step instructions. Ensure the output is in JSON format matching the provided schema.";
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: schema,
                },
            });

            const jsonText = response.text.trim();
            const recipeData = JSON.parse(jsonText);

            let markdown = `# ${recipeData.recipeName}\n\n`;
            markdown += `${recipeData.description}\n\n`;
            markdown += `## Ingredients\n`;
            markdown += recipeData.ingredients.map((ing: string) => `- ${ing}`).join('\n');
            markdown += `\n\n## Instructions\n`;
            markdown += recipeData.instructions.map((step: string, i: number) => `${i + 1}. ${step}`).join('\n');
            
            const html = await marked.parse(markdown);
            setRecipeHtml(html);

        } catch (e) {
            console.error(e);
            let errorMessage = 'An unexpected error occurred while generating the recipe.';
            if (e instanceof Error) {
                errorMessage = `Error: ${e.message}. Please check the console for more details.`;
            }
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <ToolContainer title="AI Recipe Generator" details={details}>
            <div className="space-y-6">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Ingredients
                        </label>
                        <textarea
                            id="ingredients"
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                            placeholder="e.g., 2 chicken breasts, 1 can of tomatoes, basil, pasta"
                            className="w-full h-24 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
                        />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="diet" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Dietary Restrictions (optional)
                            </label>
                            <input
                                id="diet"
                                type="text"
                                value={diet}
                                onChange={(e) => setDiet(e.target.value)}
                                placeholder="e.g., vegetarian, gluten-free"
                                className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="mealType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Meal Type (optional)
                            </label>
                            <input
                                id="mealType"
                                type="text"
                                value={mealType}
                                onChange={(e) => setMealType(e.target.value)}
                                placeholder="e.g., dinner, dessert, quick snack"
                                className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <button
                        onClick={generateRecipe}
                        disabled={isLoading}
                        className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-lg disabled:bg-gray-500 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Generating...' : 'Generate Recipe'}
                    </button>
                </div>

                <div className="mt-6 min-h-[200px] bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                    {isLoading && (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <p className="mt-4 text-gray-600 dark:text-gray-400">Cooking up something delicious...</p>
                        </div>
                    )}
                    {error && (
                        <div className="flex items-center justify-center h-full text-red-500 dark:text-red-400">
                            {error}
                        </div>
                    )}
                    {recipeHtml && (
                        <div
                            className="prose dark:prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: recipeHtml }}
                        />
                    )}
                    {!isLoading && !error && !recipeHtml && hasGenerated.current === false && (
                         <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                            Your generated recipe will appear here.
                        </div>
                    )}
                </div>
            </div>
        </ToolContainer>
    );
};

export default AiRecipeGenerator;
