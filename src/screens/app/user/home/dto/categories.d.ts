type SubCategoryDto = {
    uuid: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
  
  type CategoryDto = {
    uuid: string;
    name: string;
    icon: string;
    categories: SubCategoryDto[];
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
  
type SubCategory = {
  name: string;
  uuid: string;
};

type InternalCategory = {
  name: string;
  image: any;
  subCategories: SubCategory[];
  uuid: string;
};
  
