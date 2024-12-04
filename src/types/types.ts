export interface RecipeDataResponseType {
  from: number;
  to: number;
  count: number;
  _links: _ResponseLinks;
  hits: RecipeDataHitsType[];
}

export interface _ResponseLinks {
  self: {
    href: string;
    title: string;
  };
  next: {
    href: string;
    title: string;
  };
}

export interface RecipeDataHitsType {
  recipe: {
    uri: string;
    label: string;
    image: string;
    images: {
      THUMBNAIL: {
        url: string;
        width: number;
        height: number;
      };
      SMALL: {
        url: string;
        width: number;
        height: number;
      };
      REGULAR: {
        url: string;
        width: number;
        height: number;
      };
      LARGE: {
        url: string;
        width: number;
        height: number;
      };
    };
    source: string;
    url: string;
    shareAs: string;
    yield: number;
    dietLabels: string[];
    healthLabels: string[];
    cautions: string[];
    ingredientLines: string[];
    ingredients: {
      text: string;
      quantity: number;
      measure: string;
      food: string;
      weight: number;
      foodId: string;
    }[];
    calories: number;
    glycemicIndex: number;
    inflammatoryIndex: number;
    totalCO2Emissions: number;
    co2EmissionsClass: string;
    totalWeight: number;
    cuisineType: string[];
    mealType: string[];
    dishType: string[];
    instructions: string[];
    tags: string[];
    externalId: string;
    totalNutrients: {
      additionalProp1: {
        label: string;
        quantity: number;
        unit: string;
      };
      additionalProp2: {
        label: string;
        quantity: number;
        unit: string;
      };
      additionalProp3: {
        label: string;
        quantity: number;
        unit: string;
      };
    };
    totalDaily: {
      additionalProp1: {
        label: string;
        quantity: number;
        unit: string;
      };
      additionalProp2: {
        label: string;
        quantity: number;
        unit: string;
      };
      additionalProp3: {
        label: string;
        quantity: number;
        unit: string;
      };
    };
    digest: [
      {
        label: string;
        tag: string;
        schemaOrgTag: string;
        total: number;
        hasRDI: true;
        daily: number;
        unit: string;
        sub: string;
      },
    ];
  };
  _links: _ResponseLinks;
}

export interface RecipeInformation {
  cuisine_type: string[];
  meal_type: string[];
  dish_type: string[];
}

export type AdditionalProp = {
  label: string;
  quantity: number;
  unit: string;
};
export interface NutritionalInformation {
  diet_labels: string[];
  health_labels: string[];
  cautions: string[];
  calories: number;
  total_nutrients: {
    additionalProp1: AdditionalProp;
    additionalProp2: AdditionalProp;
    additionalProp3: AdditionalProp;
  };
  total_daily: {
    additionalProp1: AdditionalProp;
    additionalProp2: AdditionalProp;
    additionalProp3: AdditionalProp;
  };
}

export type RecipeIngredient = {
  text: string;
  quantity: number;
  measure: string;
  food: string;
  weight: number;
  foodId: string;
};
export interface RecipeIngredients {
  ingredients: RecipeIngredient[];
  ingredient_lines: string[];
}
