import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  X,
  Heart,
  Share2,
  Bookmark,
  Linkedin,
  Twitter,
} from "lucide-react";

type Speaker = {
  id: number;
  name: string;
  role: string;
  topic: string;
  category: string;
  bio: string;
  image: string;
  linkedin: string;
  twitter: string;
  featured?: boolean;
};

interface SpeakerModalProps {
  speaker: Speaker;
  onClose: () => void;
}

export function SpeakerModal({ speaker, onClose }: SpeakerModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    modalRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      className="modal-overlay"
      initial={false}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      onClick={onClose}
      style={{ willChange: "opacity" }}
    >
      <motion.div
        ref={modalRef}
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        initial={false}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 35,
          mass: 0.5,
        }}
        style={{ willChange: "transform, opacity" }}
        tabIndex={-1}
      >
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="modal-image-container">
          <img src={speaker.image} alt={speaker.name} className="modal-image" />
          <div className="modal-image-overlay" />

          <div className="modal-quick-actions">
            <button
              className={`quick-action-btn ${liked ? "active" : ""}`}
              onClick={() => setLiked(!liked)}
            >
              <Heart size={18} fill={liked ? "#e62b1e" : "none"} />
            </button>
            <button
              className={`quick-action-btn ${saved ? "active" : ""}`}
              onClick={() => setSaved(!saved)}
            >
              <Bookmark size={18} fill={saved ? "#e62b1e" : "none"} />
            </button>
            <button className="quick-action-btn">
              <Share2 size={18} />
            </button>
          </div>
        </div>

        <div className="modal-info">
          <div className="modal-category">{speaker.category}</div>
          <h3 className="modal-name">{speaker.name}</h3>
          <p className="modal-role">{speaker.role}</p>

          <div className="modal-topic-box">
            <span className="topic-label">Speaking on</span>
            <span className="topic-value">{speaker.topic}</span>
          </div>

          <p className="modal-bio">{speaker.bio}</p>

          <div className="modal-social">
            <a
              href={speaker.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <Linkedin size={18} /> LinkedIn
            </a>
            <a
              href={speaker.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <Twitter size={18} /> Twitter
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
