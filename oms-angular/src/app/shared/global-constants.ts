export class GlobalConstants {

    public static genericError: string = "Something went wrong. Please try again later";
    public static unAuthorized: string = "You are not authorized person";
    public static productExistError: string = "Product already exist";
    public static productAdded: string = "Product added successful";
    public static orderAdded: string = "Order Create Success!"
    public static delete: string = "Bakit mo dinelete mali yan!"

    public static nameRegex: string = "[a-zA-Z0-9]*";
    public static emailRegex: string = "[A-Za-z0-9._%-]+@[A-Za-z0-9._%]+\\.[a-z][2,3]";
    public static contactNumberRegex: string = "^[e0-9]{10,10}$";
    public static error: string = "error";
    public static quantityError: string = "Quantity must be greater than 0";
}