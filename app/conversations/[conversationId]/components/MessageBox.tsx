"use client";

import Avatar from "@/app/components/Avatar";
import { FullMessageType } from "@/app/types";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import ImageModal from "./ImageModal";
import { translateMessage } from "@/app/utils/Translation";
import { IoLanguageOutline } from "react-icons/io5";

interface MessageBoxProps {
    data: FullMessageType;
    isLast?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({ data, isLast }) => {
    const session = useSession();
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [translatedBody, setTranslatedBody] = useState<string | null>(null);
    const [isTranslateButtonPressed, setIsTranslateButtonPressed] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState("vi"); 

    const isOwn = session?.data?.user?.email === data?.sender?.email;
    const seenList = (data.seen || [])
        .filter((user) => user.email !== data?.sender?.email)
        .map((user) => user.name)
        .join(", ");

    const container = clsx("flex gap-3 p-4", isOwn && "justify-end");
    const avatar = clsx(isOwn && "order-2");
    const body = clsx("flex flex-col gap-2", isOwn && "items-end");
    const message = clsx(
        "text-sm w-fit",
        isOwn ? "bg-sky-500 text-white" : "bg-gray-100",
        data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
    );

    const translateContent = async () => {
        if (data.body && isTranslateButtonPressed) {
            const targetLanguage = currentLanguage === "vi" ? "en" : "vi";
            const translatedText = await translateMessage(
                data.body,
                targetLanguage
            );
            setTranslatedBody(translatedText);
            setCurrentLanguage(targetLanguage); // Cập nhật ngôn ngữ hiện tại
        }
    };

    const handleTranslateButtonClick = () => {
        setIsTranslateButtonPressed(!isTranslateButtonPressed);
    };

    useEffect(() => {
        if (isTranslateButtonPressed) {
          translateContent();
        }
      }, [data.body, isTranslateButtonPressed]);

    return (
        <div className={container}>
            <div className={avatar}>
                <Avatar user={data.sender} />
            </div>
            <div className={body}>
                <div className="flex items-center gap-1">
                    <div className="text-sm text-gray-500">
                        {data.sender.name}
                    </div>
                    <div className="text-xs text-gray-400">
                        {format(new Date(data.createdAt), "p")}
                    </div>
                </div>
                <div
                    className={message}
                    style={{
                        position: "relative",
                        zIndex: 0,
                    }}
                >
                    <ImageModal
                        src={data.image}
                        isOpen={imageModalOpen}
                        onClose={() => setImageModalOpen(false)}
                    />
                    {data.image ? (
                        <Image
                            onClick={() => setImageModalOpen(true)}
                            alt="Image"
                            height="288"
                            width="288"
                            src={data.image}
                            className="
                                object-cover
                                cursor-pointer
                                hover:scale-110
                                transition
                                translate
                            "
                        />
                    ) : (
                        <div>{translatedBody || data.body}</div>
                    )}
                    <button
                        onClick={handleTranslateButtonClick}
                        style={{
                            position: "absolute",
                            bottom: -10,
                            right: isOwn ? "auto" : 10,
                            left: isOwn ? 10 : "auto",
                            width: "18px",
                            height: "18px",
                            borderRadius: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            outline: "none",
                            border: "none",
                            cursor: "pointer",
                            backgroundColor: "white",
                            color: "black",
                            boxShadow: "0 0 1px 1px rgba(0, 0, 0, 0.2)",
                        }}
                        className="translate-btn"
                    >
                        <IoLanguageOutline size={10} />
                    </button>
                </div>
                {isLast && isOwn && seenList.length > 0 && (
                    <div
                        className="
                            text-xs
                            font-light
                            text-gray-500
                        "
                    >
                        {`Seen by ${seenList}`}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessageBox;
