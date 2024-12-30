import { Box, Text, Image, Button} from "@chakra-ui/react";
import { Divider } from "@chakra-ui/layout";
import { Link } from "react-router-dom";
import Nav from "../layout/Nav";
import Footer from "../layout/Footer";
import gdgLogo from "../../assets/gdg-logo.png"; // Import the GDG logo
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TeamPage from "./Team";

const carouselItems = [
  {
    title: "Welcome to GDG",
    description: "Join us to learn, share, and connect with developers.",
    image: gdgLogo,
  },
  {
    title: "Write Articles",
    description: "Share your knowledge and insights with the community.",
    image: gdgLogo,
  },
  {
    title: "Read Articles",
    description: "Explore articles written by fellow developers.",
    image: gdgLogo,
  },
];

const introVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const carouselVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
};

const logoVariants = {
  animate: {
    scale: [1, 1.1, 1],
    rotate: [0, 360, 0],
    transition: {
      duration: 5,
      ease: "easeInOut",
      loop: Infinity,
    },
  },
};

function Dashboard() {
  

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box
        width={["100vw", null, null, "70vw"]}
        display="flex"
        justifyContent="center"
        flexDirection="column"
      >
        <Nav />

        <Box px={["6", "10"]}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={introVariants}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              flexDirection={["column-reverse", null, "row"]}
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="flex-start"
                flexDirection="column"
              >
                <Text fontSize={["4xl", "5xl"]} mt={["6", null, "none"]}>
                  A place to write, read, and connect
                </Text>
                <Text fontSize={["lg", "xl"]} mt="4">
                  It's easy and free to post your thinking on any topic and
                  connect with millions of readers.
                </Text>
                <Box  display="flex" justifyContent="center" alignItems="center" gap={5} >
                <Button
                  as={Link}
                  to="/write-article"
                  colorScheme="blue"
                  isFullWidth
                  py="8"
                  mt="6"
                  fontSize="xl"
                  rounded={"full"}
                  >Write</Button>                
                <Button
                  as={Link}
                  to="/suggested-articles"
                  colorScheme="blue"
                  isFullWidth
                  py="8"
                  mt="6"
                  fontSize="xl"
                  rounded={"full"}
                >
                 Discover More
                </Button>
                </Box>
                
              </Box>
              <Box px="8" d="flex" justifyContent="center" alignItems="center">
                <motion.div variants={logoVariants} animate="animate">
                  <Image src={gdgLogo} alt="GDG Logo" /> {/* Use the GDG logo */}
                </motion.div>
              </Box>
            </Box>
          </motion.div>
          <Divider my={["10", "16"]} />
        </Box>

        <Box px={["6", "10"]}>
          <motion.div initial="hidden" animate="visible" variants={carouselVariants}>
            <Slider {...settings}>
              {carouselItems.map((item, index) => (
                <Box key={index} textAlign="center">
                  <Image src={item.image} alt={item.title} mb={4} />
                  <Text fontSize="2xl" fontWeight="bold">
                    {item.title}
                  </Text>
                  <Text fontSize="lg">{item.description}</Text>
                </Box>
              ))}
            </Slider>
          </motion.div>
        </Box>
        <TeamPage/>
        <Footer />
      </Box>
    </Box>
  );
}

export default Dashboard;
