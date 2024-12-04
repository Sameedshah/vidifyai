"use client";

import axios from "axios";
import * as z from "zod";
import { Heading } from "@/components/heading";
import { Download, ImageIcon } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { amountOptions, formSchema, resolutionOptions } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";


const ImagePage = () => {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
    },
  });
  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([]);
      console.log(values);

      const response = await axios.post("/api/image", values);
      const urls = Object.keys(response.data).map(
        (key) => response.data[key].url
      );

      setImages(urls);

      form.reset();
    } catch (error: any) {
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (  
    <div>
      <Heading
        title="Image Generation"
        description="Turn your prompt into Image"
        icon={ImageIcon}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="A Photorealistic image of Queen with a Sword."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {amountOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {" "}
                            {option.label}{" "}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="resolution"
                render={({ field }: { field: any }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {resolutionOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {" "}
                            {option.label}{" "}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-20">
              <Loader />
            </div>
          )}
          {images.length === 0 && !isLoading && (
            <div>
              <Empty label="No Images generated." />
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8 ">
            {images.map((src) => (
              <Card key={src} className="rounded-lg overflow-hidden">
                <div className="relative aspect-square">
                  <Image
                    alt="Image"
                    fill
                    src={src}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <CardFooter className="p-2">
                  <Button
                    variant={"secondary"}
                    className="w-full"
                    onClick={() => window.open(src)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ImagePage;


// "use client";

// import axios from "axios";
// import * as z from "zod";
// import { Heading } from "@/components/heading";
// import { Download, ImageIcon } from "lucide-react";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { amountOptions, formSchema, resolutionOptions } from "./constants";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import { Empty } from "@/components/empty";
// import { Loader } from "@/components/loader";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Card, CardFooter } from "@/components/ui/card";
// import Image from "next/image";

// const ImagePage = () => {
//   const router = useRouter();
//   const [images, setImages] = useState<string[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       prompt: "",
//       amount: "1",
//       resolution: "512x512",
//     },
//   });
//   const isLoading = form.formState.isSubmitting;

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     try {
//       // Reset previous state
//       setImages([]);
//       setError(null);

//       // Send request to API
//       const response = await axios.post("/api/image", values);
      
//       // Directly set the images (now base64 data URLs)
//       setImages(response.data);

//       form.reset();
//     } catch (error: any) {
//       console.error(error);
//       setError(error.response?.data?.error || "An error occurred during image generation");
//     } finally {
//       router.refresh();
//     }
//   };

//   return (  
//     <div>
//       <Heading
//         title="Image Generation"
//         description="Turn your prompt into Image"
//         icon={ImageIcon}
//         iconColor="text-pink-700"
//         bgColor="bg-pink-700/10"
//       />
//       <div className="px-4 lg:px-8">
//         <div>
//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(onSubmit)}
//               className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
//             >
//               <FormField
//                 name="prompt"
//                 render={({ field }) => (
//                   <FormItem className="col-span-12 lg:col-span-6">
//                     <FormControl className="m-0 p-0">
//                       <Input
//                         className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
//                         disabled={isLoading}
//                         placeholder="A Photorealistic image of Queen with a Sword."
//                         {...field}
//                       />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="amount"
//                 render={({ field }) => (
//                   <FormItem className="col-span-12 lg:col-span-2">
//                     <Select
//                       disabled={isLoading}
//                       onValueChange={field.onChange}
//                       value={field.value}
//                       defaultValue={field.value}
//                     >
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue defaultValue={field.value} />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         {amountOptions.map((option) => (
//                           <SelectItem key={option.value} value={option.value}>
//                             {option.label}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="resolution"
//                 render={({ field }: { field: any }) => (
//                   <FormItem className="col-span-12 lg:col-span-2">
//                     <Select
//                       disabled={isLoading}
//                       onValueChange={field.onChange}
//                       value={field.value}
//                       defaultValue={field.value}
//                     >
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue defaultValue={field.value} />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         {resolutionOptions.map((option) => (
//                           <SelectItem key={option.value} value={option.value}>
//                             {option.label}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </FormItem>
//                 )}
//               />
//               <Button
//                 type="submit"
//                 className="col-span-12 lg:col-span-2 w-full"
//                 disabled={isLoading}
//               >
//                 Generate
//               </Button>
//             </form>
//           </Form>
//         </div>

//         {/* Error Handling */}
//         {error && (
//           <div className="bg-red-500/10 p-4 rounded-lg mt-4 text-red-500">
//             {error}
//           </div>
//         )}

//         <div className="space-y-4 mt-4">
//           {isLoading && (
//             <div className="p-20">
//               <Loader />
//             </div>
//           )}
//           {images.length === 0 && !isLoading && !error && (
//             <div>
//               <Empty label="No Images generated." />
//             </div>
//           )}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8 ">
//             {images.map((src, index) => (
//               <Card key={index} className="rounded-lg overflow-hidden">
//                 <div className="relative aspect-square">
//                   <Image
//                     alt={`Generated Image ${index + 1}`}
//                     fill
//                     src={src}
//                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                   />
//                 </div>
//                 <CardFooter className="p-2">
//                   <Button
//                     variant={"secondary"}
//                     className="w-full"
//                     onClick={() => {
//                       // Create a temporary link to download the base64 image
//                       const link = document.createElement('a');
//                       link.href = src;
//                       link.download = `generated-image-${index + 1}.png`;
//                       link.click();
//                     }}
//                   >
//                     <Download className="h-4 w-4 mr-2" />
//                     Download
//                   </Button>
//                 </CardFooter>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ImagePage;