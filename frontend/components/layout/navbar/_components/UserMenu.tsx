import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { LogOutIcon, Trash2Icon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { deleteUserAccount, logoutUser } from "@/components/layout/navbar/_components/actions";
import { toast } from "sonner";

export default function UserMenu() {
  async function deleteAccount() {
    toast.error("Account permanently deleted", {
      description: "Your taste profile and watchlist have been removed from our servers.",
    });
    await deleteUserAccount();
  }
  async function logout() {
    toast.success("Logged out successfully", {
      description: "Goodbye! Hope to see you back soon for more movies.",
    });
    await logoutUser();
  }

  return (
    <div className="flex justify-center z-10">
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar size="lg">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuGroup>
              <DropdownMenuItem variant="default" onClick={logout}>
                <LogOutIcon />
                Log Out
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DialogTrigger className="w-full">
                <DropdownMenuItem variant="destructive">
                  <Trash2Icon />
                  Delete Account
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DialogContent className="sm:max-w-100">
          <DialogHeader>
            <DialogTitle>Delete your account permanently?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. You will permanently lose your watchlist, movie ratings,
              and all personalized recommendations from our servers.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-6 flex flex-col-reverse sm:flex-row gap-2">
            <Button variant="outline">Cancel</Button>
            <Button variant="destructive" onClick={deleteAccount}>
              Delete Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
