export type DateInput = Date | number | string;

export class DateUtils {
  public static isDateValid(dateInput: DateInput): boolean {
    if (dateInput instanceof Date) {
      return !Number.isNaN(dateInput.getTime());
    }
    return !Number.isNaN(this.toDate(dateInput));
  }

  public static toDate(dateInput: DateInput): Date {
    if (dateInput instanceof Date) {
      return dateInput;
    }
    return new Date(dateInput);
  }

  public static toDateOrThrow(dateInput: DateInput): Date {
    const date = this.toDate(dateInput);
    if (this.isDateValid(date)) {
      return date;
    }
    throw new Error("Invalid date input");
  }
}
