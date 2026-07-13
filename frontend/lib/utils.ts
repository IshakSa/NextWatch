import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function toMovieLength(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) {
    return `${minutes}m`;
  }

  return `${hours}h${minutes}m`;
}

export function toDisplayContentLength(
  type: "movie" | "tv",
  length: number,
  shortVersion?: boolean,
) {
  if (type === "movie") {
    return toMovieLength(length);
  }
  return `${length} ${shortVersion ? "Eps." : "Episodes"}`;
}

export function toDisplayContentType(type: "movie" | "tv") {
  return type === "tv" ? "Series" : "Movie";
}

export function toWatchedDateDisplay(unixTimestampWatchedDate: number) {
  const currentTime = getCurrentTime();
  const agoSeconds = currentTime - unixTimestampWatchedDate;

  const agoHours = Math.floor(agoSeconds / 60 / 60);
  if (agoHours < 1) return "few moments";
  if (agoHours === 1) return "1 hour";
  if (agoHours < 24) return `${agoHours} hours`;

  const agoDays = Math.floor(agoHours / 24);
  if (agoDays === 1) return "1 day";
  if (agoDays < 30) return `${agoDays} days`;

  const agoMonths = Math.floor(agoDays / 30);
  if (agoMonths === 1) return "1 month";
  if (agoMonths < 12) return `${agoMonths} months`;

  const agoYears = Math.floor(agoMonths / 12);
  if (agoYears === 1) return "1 year";
  return `${agoYears} years`;
}

export function getCurrentTime() {
  return Math.floor(Date.now() / 1000);
}

export function toReleaseDateDisplay(date: string) {
  // date format looks like this: yyyy-mm-dd,
  // to only get the year, we slice from index 0 to 4
  return date.slice(0, 4)
}

export function isAlreadyReleased(date: string) {
  const currentTime = Date.now()
  const dateTime = new Date(date).getTime()

  return dateTime <= currentTime;

}
